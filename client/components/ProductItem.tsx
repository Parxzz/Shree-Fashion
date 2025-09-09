import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/app/store";
import { addToCart } from "@/features/cart/cartSlice";
import { Product } from "@/features/shop/shopSlice";
import gsap from "gsap";
import { Link } from "react-router-dom";

export default function ProductItem({ product }: { product: Product }) {
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { y: 20, opacity: 0, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" },
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      className="group rounded-xl border p-3 transition-shadow hover:shadow-lg"
    >
      <Link to={`/product/${encodeURIComponent(product.id)}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-muted">
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
          <span className="absolute left-2 top-2 rounded bg-black/60 px-2 py-0.5 text-xs text-white">
            Pexels
          </span>
        </div>
      </Link>
      <div className="mt-3 flex items-start justify-between gap-2">
        <div>
          <p className="text-sm text-muted-foreground capitalize">
            {product.category}
          </p>
          <Link
            to={`/product/${encodeURIComponent(product.id)}`}
            className="font-medium hover:underline"
          >
            {product.title}
          </Link>
        </div>
        <div className="font-semibold">₹{product.price}</div>
      </div>
      <Button
        className="mt-3 w-full"
        onClick={() =>
          dispatch(
            addToCart({
              id: product.id,
              title: product.title,
              price: product.price,
              image: product.image,
              qty: 1,
              size: product.size,
            }),
          )
        }
      >
        Add to Cart
      </Button>
    </div>
  );
}
