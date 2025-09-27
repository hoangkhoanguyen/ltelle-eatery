"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from "../../shared/ProductCard";
import "swiper/css";
import { Autoplay } from "swiper/modules";

const RelatedProductsSlider = () => {
  return (
    <Swiper
      autoplay={{ delay: 3000 }}
      modules={[Autoplay]}
      breakpoints={{
        0: {
          slidesPerView: 1.2,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 2.2,
          spaceBetween: 12,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
      }}
    >
      <SwiperSlide>
        <ProductCard />
      </SwiperSlide>
      <SwiperSlide>
        <ProductCard />
      </SwiperSlide>
      <SwiperSlide>
        <ProductCard />
      </SwiperSlide>
      <SwiperSlide>
        <ProductCard />
      </SwiperSlide>
    </Swiper>
  );
};

export default RelatedProductsSlider;
