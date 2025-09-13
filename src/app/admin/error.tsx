"use client";

export default function AdminError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold text-red-600 mb-4">
        관리자 페이지 오류
      </h1>
      <p className="mb-4">
        {error.message || "알 수 없는 오류가 발생했습니다."}
      </p>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        다시 시도
      </button>
    </div>
  );
}
