import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import '../App.css';
import { Pagination } from 'swiper/modules';

export default function Slider() {
  return (
    <>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide><img src="https://i.ibb.co/rHCmht5/khara-woods-KR84-Rp-MCb0w-unsplash.jpg" alt="" /></SwiperSlide>
        <SwiperSlide><img src="https://i.ibb.co/c2z5w5d/painting-911804-1920.jpg" alt="" /></SwiperSlide>
        <SwiperSlide><img src="https://i.ibb.co/44FrbJM/russn-fckr-kr-V5a-S4j-Dj-A-unsplash.jpg" alt="" /></SwiperSlide>
      </Swiper>
    </>
  );
}