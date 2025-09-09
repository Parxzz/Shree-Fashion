import { useParams, useNavigate } from "react-router-dom";
import { useMemo, useState, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { Product, selectFilteredProducts } from "@/features/shop/shopSlice";
import { addToCart } from "@/features/cart/cartSlice";
import { Button } from "@/components/ui/button";
import gsap from "gsap";

export default function SingleProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const all = useAppSelector(selectFilteredProducts as any) as Product[];
  const product = useMemo(() => all.find((p) => p.id === id), [all, id]);
  const [size, setSize] = useState<string | undefined>(product?.size || "M");
  const [qty, setQty] = useState(1);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        box.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4 },
      );
    });
    return () => ctx.revert();
  }, [id]);

  if (!product)
    return (
      <main className="mx-auto max-w-5xl px-4 py-10">
        <p>Product not found.</p>
      </main>
    );

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div ref={box} className="grid gap-8 md:grid-cols-2">
        <div className="rounded-2xl overflow-hidden ring-1 ring-border">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h1 className="text-2xl font-semibold">{product.title}</h1>
          <p className="mt-1 capitalize text-muted-foreground">
            {product.category}
          </p>
          <div className="mt-4 text-2xl font-bold">₹{product.price}</div>

          <div className="mt-6">
            <h3 className="text-sm font-medium">Size</h3>
            <div className="mt-2 flex gap-2">
              {["S", "M", "L", "XL"].map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`rounded border px-3 py-1 text-sm ${size === s ? "border-rose-500 text-rose-600" : ""}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <button
              className="rounded border px-3 py-1"
              onClick={() => setQty(Math.max(1, qty - 1))}
            >
              -
            </button>
            <span>{qty}</span>
            <button
              className="rounded border px-3 py-1"
              onClick={() => setQty(qty + 1)}
            >
              +
            </button>
          </div>

          <div className="mt-6 flex gap-3">
            <Button
              onClick={() => {
                dispatch(
                  addToCart({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    image: product.image,
                    qty,
                    size,
                  }),
                );
                navigate("/cart");
              }}
            >
              Add to Cart
            </Button>
            <Button variant="outline" onClick={() => navigate("/shop")}>
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
