"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getErrorMessage } from "@/utils";
import toast from "react-hot-toast";

export default function AdminNewProductPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !price) {
      toast.error("상품명과 가격은 필수입니다.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/admin/products/new", {
        method: "POST",
        body: JSON.stringify({
          title,
          price,
          image_url: imageUrl || null,
          description: description || null,
        }),
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        toast.success("상품이 등록되었습니다!");
        router.push("/admin/products");
      } else {
        toast.error("상품 등록에 실패했습니다.");
      }
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl p-6 mx-auto bg-white border rounded-md shadow-sm">
      <h1 className="mb-6 text-xl font-bold">상품 등록</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium">상품명 *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">가격 *</label>
          <input
            type="number"
            min="0"
            value={price}
            onChange={(e) =>
              setPrice(e.target.value === "" ? "" : Number(e.target.value))
            }
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">이미지 URL</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="https://example.com/image.jpg"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">설명</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded-md"
            rows={3}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 font-semibold text-white bg-green-600 rounded-md hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? "등록 중..." : "등록하기"}
        </button>
      </form>
    </div>
  );
}
