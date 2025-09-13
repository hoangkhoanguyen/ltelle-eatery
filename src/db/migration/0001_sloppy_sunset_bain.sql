ALTER TABLE "dev"."product_addons" ADD COLUMN "sort_order" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "dev"."product_images" DROP COLUMN "deleted_at";