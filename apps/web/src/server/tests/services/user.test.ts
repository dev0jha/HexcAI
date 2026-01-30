import { describe, expect, it, mock } from "bun:test";

import type { UserWithRole } from "@/actions/session.actions";
import { UserService } from "@/server/services/user/user.service";

describe("UserService", () => {
  describe("getUser", () => {
    it("returns user when session exists", async () => {
      const mockUser: UserWithRole = {
        id: "1",
        email: "test@example.com",
        role: "candidate",
        createdAt: new Date(),
        emailVerified: false,
        name: "Test User",
        updatedAt: new Date(),
      };
      const mockSession = { user: mockUser };

      const mockHeaders = new Headers();
      mock.module("@/utils/attempt", () => ({
        attempt: mock(() => Promise.resolve({ ok: true, data: mockSession })),
      }));

      mock.module("next/headers", () => ({
        headers: mock(() => Promise.resolve(mockHeaders)),
      }));

      const mockSet = { status: 200 };
      const context = { set: mockSet };

      const result = await UserService.getUser(context as any);

      if (result.success)
        expect(result).toEqual({ success: true, user: mockUser });

      if (!result.success)
        expect(result).toBe({ success: false, message: "Unauthorized" });

      expect(context.set.status).toBe(200);
    });

    it("returns unauthorized when no user in session", async () => {
      const mockSession = { user: null };

      mock.module("@/utils/attempt", () => ({
        attempt: mock(() => Promise.resolve({ ok: true, data: mockSession })),
      }));

      mock.module("next/headers", () => ({
        headers: mock(() => Promise.resolve(new Headers())),
      }));

      const mockSet = { status: 401 };
      const context = { set: mockSet };

      const result = await UserService.getUser(context as any);

      expect(result).toEqual({
        success: false,
        message: "Unauthorized",
      });
      expect(context.set.status).toBe(401);
    });
  });
});
