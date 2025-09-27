export default function ProductCardSkeleton() {
  return (
    <div className="p-2 border rounded animate-pulse">
      <div className="w-full h-32 bg-gray-200 rounded"></div>
      <div className="mt-2 h-4 bg-gray-300 rounded w-3/4"></div>
      <div className="mt-1 h-4 bg-gray-300 rounded w-1/2"></div>
    </div>
  );
}
