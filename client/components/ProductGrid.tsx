import { useMemo } from "react";
import { selectFilteredProducts, Product } from "@/features/shop/shopSlice";
import ProductItem from "@/components/ProductItem";
import { useAppSelector } from "@/app/store";

export default function ProductGrid() {
  const products = useAppSelector(selectFilteredProducts as any) as Product[];
  const list = useMemo(() => products, [products]);

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {list.map((p) => (
        <ProductItem key={p.id} product={p} />
      ))}
    </div>
  );
}
