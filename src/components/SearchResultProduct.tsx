import { type Product } from "@/types";
import LoadingImage from "./LoadingImage";

export default function SearchResultProduct(product: Product) {
  return (
    <div key={product.id} className="p-2 border rounded">
      {product.image_url && (
        <LoadingImage
          src={product.image_url}
          alt={product.title}
          className="object-cover w-full h-32"
          width={300}
          height={300}
        />
      )}
      <p className="mt-2 text-sm line-clamp-2">{product.title}</p>
      <p className="font-bold text-green-600">
        ₩{product.price.toLocaleString()}
      </p>
    </div>
  );
}
