"use client";

import { getErrorMessage } from "@/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function BannerCreatePage() {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("제목은 필수입니다.");
      return;
    }

    if (!imageUrl.trim() || !isValidUrl(imageUrl)) {
      toast.error("유효한 이미지 URL을 입력해주세요.");
      return;
    }

    if (linkUrl && !isValidUrl(linkUrl)) {
      toast.error("유효한 링크 URL을 입력해주세요.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/admin/banners/create", {
        method: "POST",
        body: JSON.stringify({
          title,
          image_url: imageUrl,
          link_url: linkUrl,
          is_active: isActive,
        }),
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        toast.success("배너가 등록되었습니다!");
        router.push(`/admin/banners`);
      } else {
        const { error } = await res.json();
        toast.error(error || "배너 등록 실패");
      }
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl p-6 mx-auto bg-white rounded-md shadow-md">
      <Toaster position="top-right" />
      <h1 className="mb-6 text-2xl font-bold">배너 등록</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 제목 */}
        <div>
          <label className="block mb-1 font-medium">제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        {/* 이미지 URL */}
        <div>
          <label className="block mb-1 font-medium">이미지 URL</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
            placeholder="https://example.com/banner.jpg"
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        {/* 링크 URL */}
        <div>
          <label className="block mb-1 font-medium">링크 URL</label>
          <input
            type="text"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            placeholder="https://example.com"
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        {/* 노출 여부 */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="isActive"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
          />
          <label htmlFor="isActive" className="font-medium">
            활성화
          </label>
        </div>

        {/* 등록 버튼 */}
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700"
        >
          {loading ? "등록 중..." : "등록하기"}
        </button>
      </form>
    </div>
  );
}
