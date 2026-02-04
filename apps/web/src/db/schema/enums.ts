import { pgEnum } from "drizzle-orm/pg-core"

/*
 * Roles constants
 * **/
export const USER_ROLE_VALUES = ["recruiter", "candidate"] as const

/*
 * User Roles Enum
 * user can be - recruiter or candidate
 * **/
export const userRoles = pgEnum("user_roles", USER_ROLE_VALUES)

export type UserRole = (typeof USER_ROLE_VALUES)[number]

/*
 *
 * Contact status for contact requests
 * ***/
export const CONTACT_STATUS = ["pending", "accepted", "rejected"] as const
export type ContactStatus = (typeof CONTACT_STATUS)[number]

export const contactStatusEnum = pgEnum("contact_status", CONTACT_STATUS)
