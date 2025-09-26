ALTER TABLE "dev"."orders" ADD COLUMN "uuid" uuid DEFAULT gen_random_uuid() NOT NULL;--> statement-breakpoint
ALTER TABLE "dev"."orders" ADD CONSTRAINT "orders_uuid_unique" UNIQUE("uuid");