import { useEffect, useMemo, useState } from "react";
import SidebarMenu from "@/components/SidebarMenu";
import ProductGrid from "@/components/ProductGrid";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/store";
import {
  selectFilters,
  setCategory,
  setFilters,
  Filters,
} from "@/features/shop/shopSlice";
import { Button } from "@/components/ui/button";

export default function Shop() {
  const [open, setOpen] = useState(false);
  const [params, setParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectFilters as any) as Filters;

  // Sync from URL
  useEffect(() => {
    const category = params.get("category");
    const search = params.get("search");
    const only = params.get("only");
    if (category) dispatch(setCategory(category as any));
    if (search) dispatch(setFilters({ search }));
    if (only === "1") dispatch(setFilters({ onlyCategory: true }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync to URL
  useEffect(() => {
    const q = new URLSearchParams();
    if (filters.category !== "all") q.set("category", String(filters.category));
    if (filters.search) q.set("search", filters.search);
    if (filters.onlyCategory) q.set("only", "1");
    setParams(q, { replace: true });
  }, [filters.category, filters.search, filters.onlyCategory]);

  const pill = useMemo(
    () =>
      filters.category !== "all" ? `Only ${filters.category}` : "Only category",
    [filters.category],
  );

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-5 flex items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold">Shop</h1>
        <div className="flex items-center gap-2">
          {filters.category !== "all" && (
            <button
              className={`rounded-full border px-3 py-1 text-sm ${filters.onlyCategory ? "border-rose-500 text-rose-600" : ""}`}
              onClick={() =>
                dispatch(setFilters({ onlyCategory: !filters.onlyCategory }))
              }
            >
              {pill}
            </button>
          )}
          <Button variant="outline" onClick={() => setOpen(true)}>
            Filters
          </Button>
        </div>
      </div>

      <ProductGrid />

      <SidebarMenu open={open} onClose={() => setOpen(false)} />
    </main>
  );
}
