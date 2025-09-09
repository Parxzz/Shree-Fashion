import { useAppDispatch, useAppSelector } from "@/app/store";
import {
  removeFromCart,
  selectCartSubtotal,
  updateQty,
} from "@/features/cart/cartSlice";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

export default function Cart() {
  const items = useAppSelector((s) => s.cart.items);
  const subtotal = useAppSelector(selectCartSubtotal as any) as number;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-semibold">Your Cart</h1>

      {items.length === 0 ? (
        <div className="mt-6 rounded-lg border p-6 text-center text-muted-foreground">
          Your cart is empty.{" "}
          <Link to="/shop" className="text-rose-600">
            Shop now
          </Link>
        </div>
      ) : (
        <div className="mt-6 grid gap-8 md:grid-cols-[1fr_320px]">
          <div className="space-y-4">
            {items.map((i) => (
              <div
                key={`${i.id}-${i.size ?? "_"}`}
                className="flex items-center gap-4 rounded-lg border p-3"
              >
                <Link
                  to={`/product/${encodeURIComponent(i.id)}`}
                  className="h-24 w-20 overflow-hidden rounded"
                >
                  <img
                    src={i.image}
                    alt={i.title}
                    className="h-full w-full object-cover"
                  />
                </Link>
                <div className="flex-1">
                  <Link
                    to={`/product/${encodeURIComponent(i.id)}`}
                    className="font-medium hover:underline"
                  >
                    {i.title}
                  </Link>
                  <div className="text-sm text-muted-foreground">
                    Size: {i.size ?? "-"}
                  </div>
                  <div className="mt-2 flex items-center gap-3">
                    <button
                      className="rounded border px-2"
                      onClick={() =>
                        dispatch(
                          updateQty({ id: i.id, qty: Math.max(1, i.qty - 1) }),
                        )
                      }
                    >
                      -
                    </button>
                    <span>{i.qty}</span>
                    <button
                      className="rounded border px-2"
                      onClick={() =>
                        dispatch(updateQty({ id: i.id, qty: i.qty + 1 }))
                      }
                    >
                      +
                    </button>
                    <button
                      className="ml-4 text-sm text-rose-600"
                      onClick={() => dispatch(removeFromCart(i.id))}
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="font-semibold">₹{i.price * i.qty}</div>
              </div>
            ))}
          </div>

          <aside className="rounded-lg border p-4 h-max">
            <h2 className="font-semibold">Order Summary</h2>
            <div className="mt-3 flex items-center justify-between text-sm">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <Button
              className="mt-4 w-full"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </Button>
          </aside>
        </div>
      )}
    </main>
  );
}
