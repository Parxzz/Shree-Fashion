import { useAppDispatch } from "@/app/store";
import { Button } from "@/components/ui/button";
import {
  Category,
  selectCategories,
  setCategory,
} from "@/features/shop/shopSlice";
import { imagesByCategory } from "@/features/shop/staticImages";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CategoriesSection() {
  const cats = useSelector(selectCategories as any) as Category[];
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-0 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Curated Categories</h2>
        <Button variant="ghost" onClick={() => navigate("/shop")}>
          View all
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {cats.map((c) => {
          const img = imagesByCategory[c]?.[0];
          return (
            <button
              key={c}
              onClick={() => {
                dispatch(setCategory(c));
                navigate(`/shop?category=${encodeURIComponent(c)}`);
              }}
              className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-white to-rose-50 p-4 ring-1 ring-border transition hover:shadow-lg"
            >
              <div className="aspect-square w-full overflow-hidden rounded-lg bg-muted">
                {img && (
                  <img
                    src={img}
                    alt={`${c} preview`}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                )}
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-sm font-medium capitalize">{c}</span>
                <span className="text-xs text-rose-600 opacity-0 transition group-hover:opacity-100">
                  Shop →
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
