ALTER TABLE "analysis" ADD COLUMN "name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "analysis" ADD COLUMN "language" text;--> statement-breakpoint
ALTER TABLE "analysis" ADD COLUMN "stars" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "analysis" ADD COLUMN "description" text;--> statement-breakpoint
ALTER TABLE "analysis" ADD COLUMN "total_score" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "analysis" ADD COLUMN "feedback" json DEFAULT '[]'::json NOT NULL;