import { useAppSelector, useAppDispatch } from "@/app/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { clearCart, selectCartSubtotal } from "@/features/cart/cartSlice";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const subtotal = useAppSelector(selectCartSubtotal as any) as number;
  const items = useAppSelector((s) => s.cart.items);
  const token = useAppSelector((s) => s.auth.token);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    const address = {
      name: `${form.get("first") as string} ${form.get("last") as string}`.trim(),
      line1: String(form.get("addr")),
      city: String(form.get("city")),
      zip: String(form.get("zip")),
    };
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify({ items, address }),
    });
    if (!res.ok) return alert("Payment failed: login required");
    dispatch(clearCart());
    navigate("/orders");
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-semibold">Checkout</h1>
      <form
        onSubmit={handlePay}
        className="mt-6 grid gap-8 md:grid-cols-[1fr_320px]"
      >
        <div className="space-y-4">
          <div>
            <h2 className="font-medium">Shipping Address</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <Input name="first" placeholder="First name" required />
              <Input name="last" placeholder="Last name" required />
              <Input
                name="addr"
                className="sm:col-span-2"
                placeholder="Address"
                required
              />
              <Input name="city" placeholder="City" required />
              <Input name="zip" placeholder="Postal code" required />
              <Input
                name="phone"
                className="sm:col-span-2"
                placeholder="Phone"
                required
              />
            </div>
          </div>

          <div>
            <h2 className="font-medium">Payment</h2>
            <div className="mt-3 grid gap-3">
              <Input placeholder="Card number (demo)" required />
              <div className="grid grid-cols-2 gap-3">
                <Input placeholder="MM/YY" required />
                <Input placeholder="CVV" required />
              </div>
            </div>
          </div>
        </div>

        <aside className="h-max rounded-lg border p-4">
          <h2 className="font-semibold">Order Summary</h2>
          <div className="mt-3 flex items-center justify-between text-sm">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>
          <Button type="submit" className="mt-4 w-full">
            Pay Now
          </Button>
          <p className="mt-2 text-xs text-muted-foreground">
            Payment is a demo placeholder. No real charge will occur.
          </p>
        </aside>
      </form>
    </main>
  );
}
