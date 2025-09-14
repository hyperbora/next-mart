"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";

const banners = [
  { src: "https://picsum.photos/seed/product1/600/300", link: "/product/1" },
  { src: "https://picsum.photos/seed/product2/600/300", link: "/product/2" },
  { src: "https://picsum.photos/seed/product3/600/300", link: "/product/3" },
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
        {banners.map((banner, idx) => (
          <SwiperSlide key={idx} className="w-full h-full">
            <Link href={banner.link}>
              <img
                src={banner.src}
                alt={`배너 ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
