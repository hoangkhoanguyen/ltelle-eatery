import Icon from "@/components/common/Icon";
import React from "react";
import { ReviewsSliders } from "./ReviewsSliders";

export const ReviewsSection = () => {
  return (
    <section className="bg-web-background-1">
      <div className="container mx-auto px-3 md:px-5 py-10">
        <div className="mb-5 text-center">
          <h3 className="text-web-secondary-3 text-web-subtitle-mobile uppercase mb-5 lg:text-web-subtitle">
            GUEST EXPERIENCE
          </h3>
          <h2 className="text-web-h2-mobile capitalize lg:text-web-h2">
            <span className="text-web-content-1">What Our</span>{" "}
            <span className="text-web-secondary-1">International</span>{" "}
            <span className="text-web-primary">Guests Say</span>
          </h2>
        </div>

        <div className="flex gap-2 justify-center items-center mb-5 ">
          <Stars />
          <span className="text-web-h4-mobile lg:text-web-h4 text-web-content-2">
            4.8
          </span>
          <span className="text-web-caption-mobile lg:text-web-caption text-web-content-2">
            (88 Reviews)
          </span>
        </div>

        <p className="max-w-3xl block mx-auto text-web-subtitle-mobile lg:text-web-subtitle text-web-content-2 text-center mb-10 md:mb-8 lg:mb-10">
          Discover why travelers from around the world choose Le Bambou for
          their finest dining experience in Ha Giang.
        </p>

        <ReviewsSliders>
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              <Review />
              <Review />
              <Review />
            </div>
          ))}
        </ReviewsSliders>
      </div>
    </section>
  );
};

function Stars() {
  return (
    <div className="flex gap-1 items-center text-web-secondary-1 text-lg">
      <Icon icon="ph:star-fill" />
      <Icon icon="ph:star-fill" />
      <Icon icon="ph:star-fill" />
      <Icon icon="ph:star-fill" />
      <Icon icon="ph:star" />
    </div>
  );
}

function Review() {
  return (
    <div className="bg-web-secondary-2 rounded-lg px-6 pb-6 pt-1">
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
          <Stars />
          <span className="text-web-content-2 text-web-caption-mobile lg:text-web-caption">
            (4/5)
          </span>
        </div>

        <p className="text-web-caption-mobile lg:text-web-caption text-web-content-1 line-clamp-4 md:line-clamp-3 lg:line-clamp-4">
          Outstanding food and excellent service. The French onion soup was the
          best I have had outside of France. The location is convenient and the
          atmosphere is cozy. Highly recommend for a special night out.
        </p>

        <a
          href={"https://google.com"}
          target="_blank"
          rel="noreferrer"
          className="text-web-secondary-1 text-web-button-mobile lg:text-web-button"
        >
          Read more
        </a>

        <div>
          <p className="line-clamp-1 mb-0.5 text-web-content-1 text-web-body-mobile lg:text-web-body">
            James Wilson
          </p>
          <p className="text-web-content-2 text-web-label-mobile lg:text-web-label">
            Dec 8, 2024
          </p>
        </div>
      </div>
    </div>
  );
}
