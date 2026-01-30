import type { UserWithRole } from "@/actions/session.actions";

export type GetUserResponse =
  | {
      success: true;
      user: UserWithRole;
    }
  | {
      success: false;
      message: string;
    };
