"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";

export default function LoadingImage(props: ImageProps) {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && (
        <div className="absolute flex items-center justify-center h-full">
          <div className="w-6 h-6 border-2 border-gray-300 rounded-full border-t-green-500 animate-spin" />
        </div>
      )}
      <Image
        {...props}
        alt={props.alt ?? ""}
        className={`${props.className || ""} ${
          loading ? "opacity-0" : "opacity-100"
        }`}
        onLoad={() => setLoading(false)}
      />
    </>
  );
}
