CREATE TYPE "public"."status" AS ENUM('scheduled', 'confirmed', 'seated', 'completed', 'cancelled', 'no_show');--> statement-breakpoint
ALTER TABLE "dev"."reservations" ALTER COLUMN "arrival_time" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "dev"."reservations" ALTER COLUMN "status" SET DEFAULT 'scheduled'::"public"."status";--> statement-breakpoint
ALTER TABLE "dev"."reservations" ALTER COLUMN "status" SET DATA TYPE "public"."status" USING "status"::"public"."status";--> statement-breakpoint
ALTER TABLE "dev"."reservations" ADD COLUMN "customer_full_name" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "dev"."reservations" DROP COLUMN "customer_first_name";--> statement-breakpoint
ALTER TABLE "dev"."reservations" DROP COLUMN "customer_last_name";