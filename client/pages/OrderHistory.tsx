import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/app/store";

interface Order {
  id: string;
  createdAt: string;
  total: number;
  status: "processing" | "shipped" | "delivered";
  items: { qty: number }[];
}

export default function OrderHistory() {
  const token = useAppSelector((s) => s.auth.token);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    (async () => {
      if (!token) return;
      const res = await fetch("/api/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) setOrders(await res.json());
    })();
  }, [token]);

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-2xl font-semibold">Your Orders</h1>
      <div className="mt-6 grid gap-3">
        {orders.map((o) => (
          <Link
            key={o.id}
            to={`/orders/${o.id}`}
            className="flex items-center justify-between rounded-lg border p-4 hover:shadow"
          >
            <div>
              <p className="font-medium">{o.id}</p>
              <p className="text-sm text-muted-foreground">
                {new Date(o.createdAt).toLocaleDateString()} •{" "}
                {o.items.reduce((s, i) => s + i.qty, 0)} item(s)
              </p>
            </div>
            <div className="text-right">
              <p className="font-semibold">₹{o.total}</p>
              <p className="text-sm capitalize text-muted-foreground">
                {o.status}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
