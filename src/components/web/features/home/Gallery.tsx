"use client";
import React, { FC, ReactNode, useState } from "react";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FreeMode, Thumbs } from "swiper/modules";

export const Gallery: FC<{
  children: ReactNode[];
  thumbs: ReactNode[];
}> = ({ children, thumbs }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

  return (
    <div>
      <Swiper
        className="mb-5"
        slidesPerView={1}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Thumbs]}
      >
        {children.map((child, index) => (
          <SwiperSlide key={index}>{child}</SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        slidesPerView={4}
        spaceBetween={8}
        freeMode
        watchSlidesProgress
        modules={[FreeMode, Thumbs]}
        wrapperClass="justify-center"
        breakpoints={{
          0: {
            slidesPerView: 5.5,
          },
          768: {
            slidesPerView: 6.5,
          },
          1024: {
            slidesPerView: 12.5,
          },
        }}
      >
        {thumbs.map((item, index) => (
          <SwiperSlide key={index}>{item}</SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
