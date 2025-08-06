"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";

interface LoadingImageProps extends ImageProps {}

export default function LoadingImage(props: LoadingImageProps) {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {loading && (
        <div className="absolute w-6 h-6 border-2 border-gray-300 border-t-green-500 rounded-full animate-spin" />
      )}
      <Image
        {...props}
        className={`${props.className || ""} ${
          loading ? "opacity-0" : "opacity-100"
        }`}
        onLoad={() => setLoading(false)}
      />
    </div>
  );
}
