import Icon from "@/components/common/Icon";
import React, { FC } from "react";
import { ReviewsSliders } from "./ReviewsSliders";
import { Button } from "../../ui/button";
import SectionSubTitleFromConfigs from "../../shared/SectionSubTitleFromConfigs";
import SectionTitleFromConfigs from "../../shared/SectionTitleFromConfigs";
import Link from "next/link";
import { webRoutes } from "@/constants/route";

export const ReviewsSection: FC<{ configs: any }> = ({ configs }) => {
  const averageRating = configs.reviews_list
    ? configs.reviews_list.reduce(
        (sum: number, review: any) => sum + review.rating,
        0,
      ) / configs.reviews_list.length
    : 0;
  const totalReviews = configs.reviews_list ? configs.reviews_list.length : 0;
  return (
    <section className="bg-web-background-1">
      <div className="container py-10">
        <div className="mb-5 text-center">
          <h3 className="text-web-secondary-3 text-web-subtitle-mobile uppercase mb-5 lg:text-web-subtitle">
            <SectionSubTitleFromConfigs sub_title={configs.sub_title} />
          </h3>
          <h2 className="text-web-h2-mobile capitalize lg:text-web-h2 flex flex-row flex-wrap justify-center items-center gap-x-2">
            <SectionTitleFromConfigs title={configs.title} />
          </h2>
        </div>

        <div className="flex gap-2 justify-center items-center mb-5 ">
          <Stars rating={Math.round(averageRating)} />
          <span className="text-web-h4-mobile lg:text-web-h4 text-web-content-2">
            {averageRating.toFixed(1)}
          </span>
          <span className="text-web-caption-mobile lg:text-web-caption text-web-content-2">
            ({totalReviews} Reviews)
          </span>
        </div>

        <p className="max-w-3xl block mx-auto text-web-subtitle-mobile lg:text-web-subtitle text-web-content-2 text-center mb-10 md:mb-8 lg:mb-10">
          {configs.description}
        </p>
        <div className="mb-10 md:px-20 lg:px-0">
          <ReviewsSliders>
            {configs.reviews_list?.map((review: any, index: number) => (
              <Review key={index} data={review} />
            ))}
          </ReviewsSliders>
        </div>

        <div className="bg-web-background-2 py-5 px-3 md:px-10 lg:px-28 rounded-lg max-w-[860px] mx-auto ">
          <div className="mb-5 text-center">
            <p className="mb-5 text-web-content-1 text-web-h4-mobile lg:text-web-h4">
              Ready to Create Your Own Memorable Experience?
            </p>
            <p className="text-web-body-mobile lg:text-web-body text-web-content-2">
              Join hundreds of satisfied international guests who have
              discovered the magic of French cuisine in the heart of Ninh Binh.
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-center gap-5">
            <Button
              as={Link}
              href={webRoutes.menu("all")}
              variant={"white"}
              className="text-web-label text-web-content-1 lg:text-web-label border-web-content-3"
            >
              Explore Our Menu
            </Button>
            <Button
              as={Link}
              href={webRoutes.reservation()}
              variant={"secondary2"}
              className="text-web-label text-web-content-1 lg:text-web-label"
            >
              Reserve Your Table
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1 items-center text-web-secondary-1 text-lg">
      {Array(5)
        .fill(0)
        .map((_, index) => (
          <Icon
            key={index}
            icon={index <= rating - 1 ? "ph:star-fill" : "ph:star"}
          />
        ))}
    </div>
  );
}

function Review({
  data: { customer_name, comment, date, rating },
}: {
  data: {
    customer_name: string;
    rating: number;
    comment: string;
    date: string;
  };
}) {
  return (
    <div className="bg-web-secondary-2 rounded-lg px-6 pb-6 pt-1 h-full">
      <div className="flex justify-between items-center mb-1">
        <Icon
          icon={"gravity-ui:quote-close"}
          className="text-web-secondary-1 text-4xl"
        />
        <div className="flex gap-1 items-center text-web-success px-2 py-1 rounded-full bg-web-background-1">
          <span className="w-2 aspect-square bg-web-success rounded-full"></span>
          <span className="text-web-label">Verified</span>
        </div>
      </div>

      <div className="flex flex-col gap-3 items-start">
        <div className="flex items-center gap-2">
          <Stars rating={rating} />
          <span className="text-web-content-2 text-web-caption-mobile lg:text-web-caption">
            ({rating}/5)
          </span>
        </div>

        <p className="text-web-caption-mobile lg:text-web-caption text-web-content-1 line-clamp-4 md:line-clamp-3 lg:line-clamp-4 min-h-24 md:min-h-20 lg:min-h-24">
          {comment}
        </p>

        {/* <a
          href={"https://google.com"}
          target="_blank"
          rel="noreferrer"
          className="text-web-secondary-1 text-web-button-mobile lg:text-web-button"
        >
          Read more
        </a> */}

        <div>
          <p className="line-clamp-1 mb-0.5 text-web-content-1 text-web-body-mobile lg:text-web-body">
            {customer_name}
          </p>
          <p className="text-web-content-2 text-web-label-mobile lg:text-web-label">
            {date}
          </p>
        </div>
      </div>
    </div>
  );
}
