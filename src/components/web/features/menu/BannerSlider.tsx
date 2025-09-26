"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";

const BannerSlider = () => {
  return (
    <Swiper
      pagination={{
        clickable: true,
      }}
      autoplay
      loop
      modules={[Pagination, Autoplay]}
      className="my-slider"
    >
      <SwiperSlide>
        <div className="relative w-full aspect-[21/9]">
          <Image src="/assets/static/menu-banner.png" fill alt="Menu Banner" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="relative w-full aspect-[21/9]">
          <Image src="/assets/static/menu-banner.png" fill alt="Menu Banner" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="relative w-full aspect-[21/9]">
          <Image src="/assets/static/menu-banner.png" fill alt="Menu Banner" />
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default BannerSlider;
