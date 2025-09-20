"use client";

import { useState } from "react";

export default function BannerCreatePage() {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [isActive, setIsActive] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      title,
      imageUrl,
      linkUrl,
      isActive,
    });
    // TODO: API 호출 (POST /api/admin/banners/create)
  };

  return (
    <div className="max-w-2xl p-6 mx-auto bg-white rounded-md shadow-md">
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
          className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700"
        >
          등록하기
        </button>
      </form>
    </div>
  );
}
