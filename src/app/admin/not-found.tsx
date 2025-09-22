"use client";

import { Suspense } from "react";

export default function AdminNotFound() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">페이지를 찾을 수 없습니다</h1>
        <p className="text-gray-500">
          요청하신 관리자 페이지가 존재하지 않습니다.
        </p>
      </div>
    </Suspense>
  );
}
