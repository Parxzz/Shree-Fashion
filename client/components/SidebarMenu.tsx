import { useEffect, useRef } from "react";
import gsap from "gsap";
import { X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/app/store";
import {
  selectCategories,
  selectFilters,
  setCategory,
  setFilters,
  setOnlyCategory,
  setSort,
  Filters,
  Category,
} from "@/features/shop/shopSlice";
import { Button } from "@/components/ui/button";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function SidebarMenu({ open, onClose }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const filters = useAppSelector(selectFilters as any) as Filters;
  const categories = useAppSelector(selectCategories as any) as Category[];
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!panelRef.current) return;
    const el = panelRef.current;
    if (open) {
      gsap.to(el, { x: 0, duration: 0.35, ease: "power2.out" });
    } else {
      gsap.to(el, { x: "100%", duration: 0.3, ease: "power2.in" });
    }
  }, [open]);

  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, [onClose]);

  return (
    <div
      className={`fixed inset-0 z-50 ${open ? "pointer-events-auto" : "pointer-events-none"}`}
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/30 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
      />
      <div
        ref={panelRef}
        className="absolute right-0 top-0 h-full w-[85%] max-w-md translate-x-full bg-background p-4 shadow-xl ring-1 ring-border"
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Filters</h3>
          <button onClick={onClose} aria-label="Close filters">
            <X />
          </button>
        </div>
        <div className="space-y-5 overflow-y-auto pr-2">
          <div>
            <h4 className="mb-2 font-medium">Category</h4>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => dispatch(setCategory("all"))}
                className={`rounded border px-3 py-2 text-sm ${filters.category === "all" ? "border-rose-500 text-rose-600" : ""}`}
              >
                All
              </button>
              {categories.map((c: Category) => (
                <button
                  key={c}
                  onClick={() => dispatch(setCategory(c))}
                  className={`rounded border px-3 py-2 text-sm capitalize ${filters.category === c ? "border-rose-500 text-rose-600" : ""}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-2 font-medium">Only Category</h4>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={filters.onlyCategory}
                onChange={(e) => dispatch(setOnlyCategory(e.target.checked))}
              />
              <span>
                Only{" "}
                {filters.category !== "all" ? filters.category : "selected"}
              </span>
            </label>
          </div>

          <div>
            <h4 className="mb-2 font-medium">Price Range</h4>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min={0}
                max={5000}
                value={filters.priceRange[1]}
                onChange={(e) =>
                  dispatch(
                    setFilters({ priceRange: [0, Number(e.target.value)] }),
                  )
                }
                className="w-full"
              />
              <span className="text-sm">Up to ₹{filters.priceRange[1]}</span>
            </div>
          </div>

          <div>
            <h4 className="mb-2 font-medium">Size</h4>
            <div className="flex flex-wrap gap-2">
              {["S", "M", "L", "XL"].map((s) => (
                <button
                  key={s}
                  onClick={() =>
                    dispatch(setFilters({ size: filters.size === s ? "" : s }))
                  }
                  className={`rounded border px-3 py-1 text-sm ${filters.size === s ? "border-rose-500 text-rose-600" : ""}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-2 font-medium">Color</h4>
            <div className="flex flex-wrap gap-2">
              {["black", "white", "beige", "rose"].map((c) => (
                <button
                  key={c}
                  onClick={() =>
                    dispatch(
                      setFilters({ color: filters.color === c ? "" : c }),
                    )
                  }
                  className={`rounded border px-3 py-1 text-sm capitalize ${filters.color === c ? "border-rose-500 text-rose-600" : ""}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-2 font-medium">Sort</h4>
            <div className="flex flex-wrap gap-2">
              {(["newest", "price", "popularity"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => dispatch(setSort(s))}
                  className={`rounded border px-3 py-1 text-sm capitalize ${filters.sort === s ? "border-rose-500 text-rose-600" : ""}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <Button className="w-full" onClick={onClose}>
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
}
