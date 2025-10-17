"use client";
import React, { FC, ReactNode } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

export const ReviewsSliders: FC<{ children: ReactNode[] }> = ({ children }) => {
  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      spaceBetween={32}
      // slidesPerView={1}
      pagination={{
        clickable: true,
        bulletActiveClass: "bg-web-primary opacity-100",
        // TODO: pagination style
        bulletClass: "swiper-pagination-bullet !bg-web-primary opacity-30",
      }}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      breakpoints={{
        0: {
          slidesPerView: 1,
          spaceBetween: 12,
        },
        640: {
          slidesPerView: 1.5,
          spaceBetween: 12,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 12,
        },
        992: {
          slidesPerView: 3,
          spaceBetween: 12,
        },
      }}
    >
      {children.map((child, index) => (
        <SwiperSlide key={index} className="pb-12">
          {child}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
