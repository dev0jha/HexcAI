"use server";

import { headers } from "next/headers";

import { Session, User } from "better-auth";

import { UserRole } from "@/db/schema/enums";
import { auth } from "@/lib/auth";
import type { ActionRes } from "@/types/actions";
import { attempt } from "@/utils/attempt";

export interface UserWithRole extends User {
  role: UserRole;
}

export interface SessionWithRole {
  sessison: Session;
  user: UserWithRole;
}

/**
 * Base session checker
 */
export async function checkSession(): Promise<ActionRes<SessionWithRole>> {
  const sessionCheckRes = await attempt(async () =>
    auth.api.getSession({
      headers: await headers(),
    })
  );
  if (!sessionCheckRes.ok) {
    return {
      success: false,
      error: `Error while checking session: ${sessionCheckRes.error.message}`,
    };
  }

  const { session, user } = sessionCheckRes.data ?? {};
  if (!session || !user) {
    return {
      success: false,
      error: "Unauthorized access",
    };
  }

  return {
    success: true,
    data: {
      sessison: session,
      user: user,
    },
  };
}

/**
 * Role base sesssion checker
 */
export async function checkSessionWithRoles(
  role: UserRole[]
): Promise<ActionRes<SessionWithRole>> {
  const baseCheck = await checkSession();
  if (!baseCheck.success) return baseCheck;

  const userRole = baseCheck.data.user.role;
  if (!role.includes(userRole)) {
    return {
      success: false,
      error: "You do not have permission to perform this operation.",
    };
  }

  return {
    success: true,
    data: baseCheck.data,
  };
}
