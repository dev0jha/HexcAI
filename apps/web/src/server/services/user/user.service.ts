import { headers } from "next/headers";

import type { Context } from "elysia/context";

import { auth } from "@/lib/auth";
import type { GetUserResponse } from "@/server/services/user/user.types";
import { attempt } from "@/utils/attempt";

export abstract class UserService {
  static async getUser({ set }: Context): Promise<GetUserResponse> {
    const nextHeaders = await headers();

    const sessionRes = await attempt(() =>
      auth.api.getSession({
        headers: nextHeaders,
      })
    );

    if (!sessionRes.ok) {
      set.status = 401;
      console.error("Error fetching session:", sessionRes.error);
      return {
        success: false,
        message: "Failed to fetch user session",
      };
    }

    const user = sessionRes.data?.user;
    if (!user) {
      set.status = 401;
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    set.status = 200;
    return {
      success: true,
      user,
    };
  }
}
