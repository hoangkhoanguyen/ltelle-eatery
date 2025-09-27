ALTER TABLE "dev"."orders" ALTER COLUMN "updated_at" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "dev"."orders" ALTER COLUMN "updated_at" SET DEFAULT now();