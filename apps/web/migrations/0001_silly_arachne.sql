CREATE TYPE "public"."user_roles" AS ENUM('recuiter', 'candidate');--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "role" "user_roles" NOT NULL;