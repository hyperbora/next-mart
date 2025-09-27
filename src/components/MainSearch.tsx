"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function MainSearch() {
  const [keyword, setKeyword] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (keyword.trim() === "") return;
    router.push(`/products?query=${encodeURIComponent(keyword)}`);
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="flex items-center space-x-2">
      <input
        type="text"
        placeholder="상품명으로 검색"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={handleEnter}
        className="flex-1 p-2 border rounded"
      />
      <button
        onClick={handleSearch}
        className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
      >
        검색
      </button>
    </div>
  );
}
