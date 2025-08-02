"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error caught:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] bg-gray-50 text-center py-10">
      <h1 className="text-2xl font-bold text-red-600 mb-2">
        문제가 발생했습니다
      </h1>
      <p className="text-gray-600 mb-4">{error.message}</p>
      <div className="space-x-4">
        <button
          onClick={() => reset()}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          다시 시도
        </button>
        <Link
          href="/"
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          메인 페이지로 이동
        </Link>
      </div>
    </div>
  );
}
