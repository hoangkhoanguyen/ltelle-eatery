ALTER TABLE "dev"."reservations" ALTER COLUMN "number_of_people" SET DATA TYPE varchar(20);--> statement-breakpoint
ALTER TABLE "dev"."reservations" ALTER COLUMN "number_of_people" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "dev"."reservations" ALTER COLUMN "arrival_time" SET DATA TYPE time;--> statement-breakpoint
ALTER TABLE "dev"."reservations" ADD COLUMN "arrival_date" date NOT NULL;