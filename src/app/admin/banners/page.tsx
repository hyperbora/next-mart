"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import LoadingImage from "@/components/LoadingImage";
import toast from "react-hot-toast";
import { getErrorMessage } from "@/utils";
import ConfirmModal from "@/components/ConfirmModal";

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
  const [bannerDeleteModal, setBannerDeleteModal] = useState(false);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await fetch("/api/admin/banners");
        const data = await res.json();

        if (res.ok) {
          setBanners(data.banners || []);
        } else {
          toast.error(data.error || "배너 데이터를 불러오지 못했습니다.");
          console.error(data.error || "배너 데이터를 불러오지 못했습니다.");
        }
      } catch (err) {
        toast.error(getErrorMessage(err));
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  const handleToggle = async (id: number, currentStatus: boolean) => {
    try {
      const res = await fetch(`/api/admin/banners/${id}/toggle`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_active: !currentStatus }),
      });

      if (res.ok) {
        setBanners((prev) =>
          prev.map((b) =>
            b.id === id ? { ...b, is_active: !currentStatus } : b
          )
        );
        toast.success("배너 활성화/비활성화 전환이 성공하였습니다.");
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
      console.error(getErrorMessage(error));
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`/api/admin/banners/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setBanners((prev) => prev.filter((b) => b.id !== id));
        toast.success("배너가 삭제되었습니다.");
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
      console.error(getErrorMessage(error));
    } finally {
      setBannerDeleteModal(false);
    }
  };

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
                <button
                  onClick={() => handleToggle(banner.id, banner.is_active)}
                  className={`px-2 py-1 text-sm rounded ${
                    banner.is_active
                      ? "bg-green-500 text-white hover:bg-green-600"
                      : "bg-gray-300 text-black hover:bg-gray-400"
                  }`}
                >
                  {banner.is_active ? "활성" : "비활성"}
                </button>
              </td>
              <td className="p-2 border">
                <div className="flex space-x-2">
                  <Link
                    href={`/admin/banners/${banner.id}/edit`}
                    className="px-2 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
                  >
                    수정
                  </Link>
                  {bannerDeleteModal && (
                    <ConfirmModal
                      title="배너 삭제"
                      message="정말 삭제하시겠습니까?"
                      onConfirm={() => {
                        handleDelete(banner.id);
                      }}
                      onCancel={() => {
                        setBannerDeleteModal(false);
                      }}
                    />
                  )}
                  <button
                    className="px-2 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
                    onClick={() => {
                      setBannerDeleteModal(true);
                    }}
                  >
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
