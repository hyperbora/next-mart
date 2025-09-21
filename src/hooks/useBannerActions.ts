"use client";

import { getApiErrorMesssage, getErrorMessage } from "@/utils";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

export interface Banner {
  id: number;
  title: string;
  image_url: string;
  link_url?: string;
  is_active: boolean;
}

export function useBannerActions(initialBanners: Banner[] = []) {
  const [banners, setBanners] = useState<Banner[]>(initialBanners);
  const [loading, setLoading] = useState(true);

  const fetchBanners = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/banners");
      const data = await res.json();
      setBanners(data.banners || []);
    } finally {
      setLoading(false);
    }
  }, []);

  // ✅ 배너 토글 함수
  const handleToggle = async (banner: Banner) => {
    const { id, is_active: currentStatus } = banner;
    try {
      const res = await fetch(`/api/admin/banners/${id}/toggle`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_active: !currentStatus }),
      });

      if (!res.ok) {
        const json = await res.json();

        throw new Error(
          getApiErrorMesssage(
            json,
            `배너 ${!currentStatus ? "활성화" : "비활성화"}에 실패했습니다.`
          )
        );
      }

      setBanners((prev) =>
        prev.map((b) => (b.id === id ? { ...b, is_active: !currentStatus } : b))
      );
      toast.success(
        `배너가 ${!currentStatus ? "활성화" : "비활성화"}되었습니다.`
      );
    } catch (error) {
      console.error(getErrorMessage(error));
      toast.error("배너 상태 변경에 실패했습니다.");
    }
  };

  // ✅ 배너 삭제 함수
  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`/api/admin/banners/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const json = await res.json();
        throw new Error(getApiErrorMesssage(json, "배너 삭제가 실패했습니다."));
      }

      setBanners((prev) => prev.filter((b) => b.id !== id));
      toast.success("배너가 삭제되었습니다.");
    } catch (error) {
      console.error(getErrorMessage(error));
      toast.error("배너 삭제에 실패했습니다.");
    }
  };

  return {
    banners,
    setBanners,
    fetchBanners,
    loading,
    setLoading,
    handleToggle,
    handleDelete,
  };
}
