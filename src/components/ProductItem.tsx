import Image from "next/image";

interface ProductItemProps {
  id: number;
  title: string;
  price: number;
  imageUrl?: string;
}

export default function ProductItem({
  title,
  price,
  imageUrl,
}: ProductItemProps) {
  return (
    <div className="border rounded-md p-2 hover:shadow-lg transition cursor-pointer bg-white">
      <div className="bg-gray-200 h-40 rounded-md mb-2 overflow-hidden flex items-center justify-center relative group">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            width={300}
            height={300}
            className="object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-110"
          />
        ) : (
          <span className="text-gray-400 text-sm">No Image</span>
        )}
      </div>
      <p className="text-sm text-gray-800 line-clamp-2 mb-1">{title}</p>
      <p className="text-green-600 font-bold">₩{price.toLocaleString()}</p>
    </div>
  );
}
