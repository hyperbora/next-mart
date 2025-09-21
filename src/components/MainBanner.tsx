"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";
import LoadingImage from "./LoadingImage";
import { useBannerActions } from "@/hooks/useBannerActions";
import LoadingSpinner from "./common/LoadingSpinner";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { getErrorMessage } from "@/utils";

export default function MainBanner() {
  const { banners, setBanners, loading, setLoading } = useBannerActions();

  useEffect(() => {
    const fetchActiveBanners = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/banners/active");
        const data = await res.json();

        if (res.ok) {
          setBanners(data.banners || []);
        } else {
          throw new Error(data.error || "배너를 불러오지 못했습니다.");
        }
      } catch (err) {
        toast.error(getErrorMessage(err));
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchActiveBanners();
  }, [setBanners, setLoading]);

  if (loading) {
    return <LoadingSpinner text="배너 불러오는 중..." />;
  }

  if (!banners.length) {
    return (
      <div className="flex items-center justify-center w-full h-64 md:h-96 bg-gray-100 rounded-lg">
        <p className="text-gray-500">등록된 배너가 없습니다.</p>
      </div>
    );
  }

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
        {banners.map((banner) => {
          const content = (
            <LoadingImage
              src={banner.image_url}
              alt={banner.title || "배너"}
              className="object-cover w-full h-full"
              width={600}
              height={300}
            />
          );

          return (
            <SwiperSlide key={banner.id} className="w-full h-full">
              {banner.link_url ? (
                <Link href={banner.link_url} target="_blank">
                  {content}
                </Link>
              ) : (
                content
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
