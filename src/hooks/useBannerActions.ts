"use client";

import { getErrorMessage } from "@/utils";
import { useState } from "react";
import toast from "react-hot-toast";

export interface Banner {
  id: number;
  title: string;
  image_url: string;
  is_active: boolean;
}

export function useBannerActions(initialBanners: Banner[] = []) {
  const [banners, setBanners] = useState<Banner[]>(initialBanners);

  // ✅ 배너 토글 함수
  const handleToggle = async (id: number, currentStatus: boolean) => {
    try {
      const res = await fetch(`/api/admin/banners/${id}/toggle`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_active: !currentStatus }),
      });

      if (!res.ok) throw new Error("토글 실패");

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
    if (!confirm("정말 삭제하시겠습니까?")) return;

    try {
      const res = await fetch(`/api/admin/banners/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("삭제 실패");

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
    handleToggle,
    handleDelete,
  };
}
