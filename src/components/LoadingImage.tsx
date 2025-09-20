"use client";

import Image, { ImageProps } from "next/image";
import { useState, useEffect, useRef } from "react";
import { ImageOff } from "lucide-react";

export default function LoadingImage(props: ImageProps) {
  const [loading, setLoading] = useState(true);
  const [timeout, setTimeoutReached] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!loading) return;

    timerRef.current = setTimeout(() => {
      setTimeoutReached(true);
      setLoading(false);
    }, 10000);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [loading]);

  const handleLoad = () => {
    setLoading(false);
    setTimeoutReached(false);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  if (timeout) {
    return (
      <div className="flex items-center justify-center w-full h-full text-gray-400">
        <ImageOff size={32} />
      </div>
    );
  }

  return (
    <>
      {loading && (
        <div className="flex items-center justify-center w-full h-full">
          <div className=" w-6 h-6 border-2 border-gray-300 rounded-full border-t-green-500 animate-spin" />
        </div>
      )}
      {
        <Image
          {...props}
          alt={props.alt ?? ""}
          className={`${props.className || ""} ${
            loading ? "opacity-0 absolute inset-0" : "opacity-100 relative"
          }`}
          onLoad={handleLoad}
          width={props.width ?? 600}
          height={props.height ?? 300}
        />
      }
    </>
  );
}
