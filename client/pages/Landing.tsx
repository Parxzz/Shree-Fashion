import Banner from "@/components/Banner";
import CategoriesSection from "@/components/CategoriesSection";
import ProductGrid from "@/components/ProductGrid";
import {
  selectFilteredProducts,
  setFilters,
  Product,
} from "@/features/shop/shopSlice";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const products = (
    useAppSelector(selectFilteredProducts as any) as Product[]
  ).slice(0, 8);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <main>
      <Banner />
      <CategoriesSection />

      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">New Arrivals</h2>
          <Button variant="ghost" onClick={() => navigate("/shop")}>
            View all
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((p: any) => (
            <div key={p.id}>
              {/* reusing ProductGrid item structure */}
              <div className="group rounded-xl border p-3 transition-shadow hover:shadow-lg">
                <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-muted">
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                  <span className="absolute left-2 top-2 rounded bg-black/60 px-2 py-0.5 text-xs text-white">
                    Placeholder
                  </span>
                </div>
                <div className="mt-3 flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm text-muted-foreground capitalize">
                      {p.category}
                    </p>
                    <h3 className="font-medium">{p.title}</h3>
                  </div>
                  <div className="font-semibold">₹{p.price}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Button
            onClick={() => {
              dispatch(setFilters({ sort: "newest" }));
              navigate("/shop");
            }}
          >
            Explore Shop
          </Button>
        </div>
      </section>
    </main>
  );
}
