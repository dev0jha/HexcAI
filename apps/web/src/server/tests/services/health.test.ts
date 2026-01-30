import { describe, expect, it } from "bun:test";

import { HealthService } from "@/server/services";

describe("HealthService", () => {
  describe("getStatus", () => {
    it("returns health status", async () => {
      const result = await HealthService.getStatus();

      expect(result).toEqual({
        status: "ok",
        message: "Service is healthy",
      });
    });
  });
});
