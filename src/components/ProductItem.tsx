import Image from "next/image";
import Link from "next/link";

interface ProductItemProps {
  id: number;
  title: string;
  price: number;
  imageUrl?: string;
}

export default function ProductItem({
  id,
  title,
  price,
  imageUrl,
}: ProductItemProps) {
  return (
    <Link
      href={`/product/${id}`}
      className="block p-2 transition bg-white border rounded-md cursor-pointer hover:shadow-lg"
    >
      <div className="relative flex items-center justify-center h-40 mb-2 overflow-hidden bg-gray-200 rounded-md group">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            width={300}
            height={300}
            className="object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-110"
          />
        ) : (
          <span className="text-sm text-gray-400">No Image</span>
        )}
      </div>
      <p className="mb-1 text-sm text-gray-800 line-clamp-2">{title}</p>
      <p className="font-bold text-green-600">₩{price.toLocaleString()}</p>
    </Link>
  );
}
