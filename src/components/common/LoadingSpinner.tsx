"use client";

import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  text?: string;
  size?: number;
}

export default function LoadingSpinner({
  text = "불러오는 중...",
  size = 36,
}: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center py-6 text-gray-600">
      <Loader2
        size={size}
        className="animate-spin mb-2 text-green-600"
        aria-label="loading"
      />
      <p className="text-sm">{text}</p>
    </div>
  );
}
