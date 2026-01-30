import { pgEnum } from "drizzle-orm/pg-core";

/*
 * Roles constants
 * **/
export const USER_ROLE_VALUES = ["recruiter", "candidate"] as const;

/*
 * User Roles Enum
 * user can be - recruiter or candidate
 * **/
export const userRoles = pgEnum("user_roles", USER_ROLE_VALUES);

export type UserRole = (typeof USER_ROLE_VALUES)[number];
