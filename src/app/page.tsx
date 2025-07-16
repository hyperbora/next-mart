import ProductCard from '@/components/feature/Product/ProductCard';
import data from '@/data.json';

export default function Home() {
  return (
    <div className="grid grid-cols-4 gap-4 mt-8">
      {
        data.map(d => {
          return <ProductCard key={d.id} props={d}/>
        })
      }
    </div>
  );
}
