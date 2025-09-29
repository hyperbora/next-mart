"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { ArrowUp, ArrowDown, Clock } from "lucide-react";
import { Suspense } from "react";
import LoadingSpinner from "./common/LoadingSpinner";

const SORT_OPTIONS = [
  { label: "최신순", value: "created_desc", icon: <Clock size={16} /> },
  { label: "가격 낮은순", value: "price_asc", icon: <ArrowUp size={16} /> },
  { label: "가격 높은순", value: "price_desc", icon: <ArrowDown size={16} /> },
];

export default function SortButtons() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <SortButtonsComponent />
    </Suspense>
  );
}

function SortButtonsComponent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentSort = searchParams.get("sort") || "created_desc";

  const handleSort = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", value);
    router.push(`/products?${params.toString()}`);
  };

  return (
    <div className="flex space-x-2 mb-4">
      {SORT_OPTIONS.map((option) => (
        <button
          key={option.value}
          onClick={() => handleSort(option.value)}
          className={`flex items-center px-4 py-2 rounded font-medium transition-colors cursor-pointer ${
            currentSort === option.value
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          <span className="mr-2">{option.icon}</span>
          {option.label}
        </button>
      ))}
    </div>
  );
}
