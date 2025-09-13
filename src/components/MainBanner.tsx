"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const banners = [
  "https://picsum.photos/seed/product1/600/300",
  "https://picsum.photos/seed/product2/600/300",
  "https://picsum.photos/seed/product3/600/300",
];

export default function MainBanner() {
  return (
    <div className={`w-full h-64 md:h-96 rounded-lg overflow-hidden`}>
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        navigation
        pagination={{ clickable: true }}
        className="w-full h-full"
      >
        {banners.map((src, idx) => (
          <SwiperSlide key={idx} className="w-full h-full">
            <img
              src={src}
              alt={`배너 ${idx + 1}`}
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
