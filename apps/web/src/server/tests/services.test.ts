import { describe, expect, it, mock, spyOn } from "bun:test"
import { HealthService } from "@/server/services"
import { UserService } from "@/server/services/user.service"
import { auth } from "@/lib/auth"

describe("HealthService", () => {
  describe("getStatus", () => {
    it("returns health status", async () => {
      const result = await HealthService.getStatus()

      expect(result).toEqual({
        status: "ok",
        message: "Service is healthy",
      })
    })
  })
})

describe("UserService", () => {
  describe("getUser", () => {
    it("returns user when session exists", async () => {
      const mockUser = { id: "1", email: "test@example.com", role: "user" }
      const mockSession = { user: mockUser }

      // Mock headers
      const mockHeaders = new Headers()
      mock.module("@/utils/attempt", () => ({
        attempt: mock(() => Promise.resolve({ ok: true, data: mockSession })),
      }))

      mock.module("next/headers", () => ({
        headers: mock(() => Promise.resolve(mockHeaders)),
      }))

      const mockSet = { status: 200 }
      const context = { set: mockSet }

      const result = await UserService.getUser(context as any)

      expect(result).toEqual({
        success: true,
        user: mockUser,
      })
      expect(context.set.status).toBe(200)
    })

    it("returns error when session fetch fails", async () => {
      const mockError = new Error("Session fetch failed")

      mock.module("@/utils/attempt", () => ({
        attempt: mock(() => Promise.resolve({ ok: false, error: mockError })),
      }))

      mock.module("next/headers", () => ({
        headers: mock(() => Promise.resolve(new Headers())),
      }))

      const mockSet = { status: 401 }
      const context = { set: mockSet }

      const result = await UserService.getUser(context as any)

      expect(result).toEqual({
        success: false,
        message: "Failed to fetch user session",
      })
      expect(context.set.status).toBe(401)
    })

    it("returns unauthorized when no user in session", async () => {
      const mockSession = { user: null }

      mock.module("@/utils/attempt", () => ({
        attempt: mock(() => Promise.resolve({ ok: true, data: mockSession })),
      }))

      mock.module("next/headers", () => ({
        headers: mock(() => Promise.resolve(new Headers())),
      }))

      const mockSet = { status: 401 }
      const context = { set: mockSet }

      const result = await UserService.getUser(context as any)

      expect(result).toEqual({
        success: false,
        message: "Unauthorized",
      })
      expect(context.set.status).toBe(401)
    })
  })
})
