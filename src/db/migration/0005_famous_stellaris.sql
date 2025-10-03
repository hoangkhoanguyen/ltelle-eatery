ALTER TABLE "dev"."ui_configs" RENAME COLUMN "name" TO "title";--> statement-breakpoint
ALTER TABLE "dev"."app_configs" DROP COLUMN "category";--> statement-breakpoint
ALTER TABLE "dev"."ui_configs" DROP COLUMN "category";