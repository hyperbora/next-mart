"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import LoadingImage from "@/components/LoadingImage";

interface Banner {
  id: number;
  title: string;
  image_url: string;
  link_url?: string;
  is_active: boolean;
  created_at: string;
}

export default function BannersPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: API 연결 (GET /api/admin/banners)
    // 임시 데이터
    setBanners([
      {
        id: 1,
        title: "테스트 배너 1",
        image_url: "https://picsum.photos/seed/banner1/300/100",
        link_url: "https://example.com",
        is_active: true,
        created_at: new Date().toISOString(),
      },
      {
        id: 2,
        title: "테스트 배너 2",
        image_url: "https://picsum.photos/seed/banner2/300/100",
        link_url: "",
        is_active: false,
        created_at: new Date().toISOString(),
      },
    ]);
    setLoading(false);
  }, []);

  if (loading) return <p>불러오는 중...</p>;

  return (
    <div className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">배너 관리</h1>
        <Link
          href="/admin/banners/create"
          className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700"
        >
          새 배너 등록
        </Link>
      </div>

      <table className="w-full text-left border border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">제목</th>
            <th className="p-2 border">이미지</th>
            <th className="p-2 border">링크</th>
            <th className="p-2 border">노출 여부</th>
            <th className="p-2 border">액션</th>
          </tr>
        </thead>
        <tbody>
          {banners.map((banner) => (
            <tr key={banner.id} className="hover:bg-gray-50">
              <td className="p-2 border">{banner.id}</td>
              <td className="p-2 border">{banner.title}</td>
              <td className="p-2 border">
                <LoadingImage
                  src={banner.image_url}
                  alt={banner.title}
                  className="object-cover w-32 h-12 border rounded"
                  width={600}
                  height={300}
                />
              </td>
              <td className="p-2 border">
                {banner.link_url ? (
                  <a
                    href={banner.link_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    링크 열기
                  </a>
                ) : (
                  "-"
                )}
              </td>
              <td className="p-2 border">
                {banner.is_active ? "활성" : "비활성"}
              </td>
              <td className="p-2 border">
                <div className="flex space-x-2">
                  <Link
                    href={`/admin/banners/${banner.id}/edit`}
                    className="px-2 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
                  >
                    수정
                  </Link>
                  <button className="px-2 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600">
                    삭제
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
