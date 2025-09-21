"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { Banner } from "@/hooks/useBannerActions";
import { getApiErrorMesssage, getErrorMessage } from "@/utils";

export default function EditBannerPage() {
  const { id } = useParams();
  const router = useRouter();
  const [banner, setBanner] = useState<Banner | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const res = await fetch(`/api/admin/banners/${id}`);
        const data = await res.json();
        if (res.ok) {
          setBanner(data.banner);
        } else {
          toast.error(
            getApiErrorMesssage(data, "배너 정보를 불러오지 못했습니다.")
          );
        }
      } catch (err) {
        toast.error(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };

    fetchBanner();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!banner) return;

    try {
      const res = await fetch(`/api/admin/banners/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(banner),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("배너가 수정되었습니다.");
        router.push("/admin/banners");
      } else {
        toast.error(getApiErrorMesssage(data, "배너 수정에 실패했습니다."));
      }
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  if (loading) return <LoadingSpinner text="배너 정보를 불러오는 중..." />;
  if (!banner) return <p>배너를 찾을 수 없습니다.</p>;

  return (
    <div className="max-w-lg p-6 mx-auto bg-white rounded shadow">
      <h1 className="mb-4 text-xl font-bold">배너 수정</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">제목</label>
          <input
            type="text"
            value={banner.title}
            onChange={(e) => setBanner({ ...banner, title: e.target.value })}
            placeholder="제목"
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">이미지 URL</label>
          <input
            type="text"
            value={banner.image_url}
            onChange={(e) =>
              setBanner({ ...banner, image_url: e.target.value })
            }
            placeholder="이미지 URL"
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">링크 URL</label>
          <input
            type="text"
            value={banner.link_url || ""}
            onChange={(e) => setBanner({ ...banner, link_url: e.target.value })}
            placeholder="링크 URL"
            className="w-full p-2 border rounded"
          />
        </div>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={banner.is_active}
            onChange={(e) =>
              setBanner({ ...banner, is_active: e.target.checked })
            }
          />
          <span>활성화</span>
        </label>
        <button
          type="submit"
          className="w-full py-2 text-white bg-green-600 rounded hover:bg-green-700"
        >
          저장
        </button>
      </form>
    </div>
  );
}
