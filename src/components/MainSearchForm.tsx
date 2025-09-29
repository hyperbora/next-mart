"use client";

import { Suspense, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function MainSearchForm() {
  return (
    <Suspense fallback={<MainSearchFallback />}>
      <MainSearch />
    </Suspense>
  );
}

function MainSearch() {
  const [keyword, setKeyword] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname === "/products") {
      const query = searchParams.get("query") || "";
      setKeyword(query);
    } else {
      setKeyword("");
    }
  }, [pathname, searchParams]);

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

function MainSearchFallback() {
  return (
    <div className="flex items-center space-x-2">
      <input
        type="text"
        placeholder="상품명으로 검색"
        value=""
        className="flex-1 p-2 border rounded"
      />
      <button className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700">
        검색
      </button>
    </div>
  );
}
