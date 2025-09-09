import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShoppingBag, Search, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/app/store";
import { selectCartCount } from "@/features/cart/cartSlice";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { selectCategories } from "@/features/shop/shopSlice";

export default function Header() {
  const count = useAppSelector((s) => selectCartCount(s));
  const categories = useAppSelector(selectCategories as any) as string[];
  const auth = useAppSelector((s) => s.auth);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleSearch = (value: string) => {
    const q = value.trim().toLowerCase();
    if (!q) return;
    const found = categories.find(
      (c) => q === c.toLowerCase() || q === c.replace(/s$/i, "").toLowerCase(),
    );
    if (found) {
      navigate(`/shop?category=${encodeURIComponent(found)}&only=1`);
    } else {
      navigate(`/shop?search=${encodeURIComponent(value)}`);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/50 dark:bg-background/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:py-4">
        <div className="flex items-center gap-3">
          <button
            className="md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
          <Link
            to="/"
            className="font-extrabold tracking-tight text-xl md:text-2xl"
          >
            <span
              className="text-foreground"
              style={{ fontFamily: '"Times New Roman", serif' }}
            >
              Shree
            </span>
            <span
              className="ml-1 rounded bg-rose-500 px-1.5 py-0.5 text-white"
              style={{
                textDecoration: "underline",
                fontFamily: "Arial, sans-serif",
              }}
            >
              Fashion
            </span>
          </Link>
        </div>

        <nav
          className={cn(
            "fixed left-0 right-0 top-14 mx-4 rounded-lg border bg-background p-4 shadow-md md:static md:mx-0 md:flex md:border-0 md:bg-transparent md:p-0 md:shadow-none",
            open ? "block" : "hidden md:block",
          )}
          onClick={() => setOpen(false)}
        >
          <ul className="flex flex-col items-start gap-3 md:flex-row md:items-center md:gap-6">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  cn(
                    "hover:text-rose-600",
                    isActive && "text-rose-600 font-semibold",
                  )
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/shop"
                className={({ isActive }) =>
                  cn(
                    "hover:text-rose-600",
                    isActive && "text-rose-600 font-semibold",
                  )
                }
              >
                Shop
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  cn(
                    "hover:text-rose-600",
                    isActive && "text-rose-600 font-semibold",
                  )
                }
              >
                Sign Up
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  cn(
                    "hover:text-rose-600",
                    isActive && "text-rose-600 font-semibold",
                  )
                }
              >
                Profile
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <div className="relative hidden items-center gap-2 rounded-full border px-3 py-1.5 md:flex">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              placeholder="Search categories or products"
              className="w-36 bg-transparent text-sm outline-none placeholder:text-muted-foreground/70"
              onKeyDown={(e) => {
                if (e.key === "Enter")
                  handleSearch((e.target as HTMLInputElement).value);
              }}
            />
          </div>
          <Button
            variant="ghost"
            className="relative"
            onClick={() => navigate("/cart")}
            aria-label="Cart"
          >
            <ShoppingBag />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-600 px-1.5 text-[10px] font-bold text-white">
                {count}
              </span>
            )}
          </Button>
          <Button
            variant="ghost"
            onClick={() => navigate(auth.user ? "/profile" : "/login")}
            aria-label="Account"
          >
            <User />
          </Button>
        </div>
      </div>
    </header>
  );
}
