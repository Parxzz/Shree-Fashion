import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/app/store";

interface Item {
  id: string;
  title: string;
  price: number;
  image: string;
  qty: number;
  size?: string;
}
interface Order {
  id: string;
  createdAt: string;
  total: number;
  status: string;
  items: Item[];
}

export default function SingleOrderHistory() {
  const { id } = useParams();
  const token = useAppSelector((s) => s.auth.token);
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    (async () => {
      if (!token || !id) return;
      const res = await fetch(`/api/orders/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) setOrder(await res.json());
    })();
  }, [id, token]);

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Order {id}</h1>
        <Link to="/orders" className="text-sm text-rose-600">
          ← Back to orders
        </Link>
      </div>
      <div className="rounded-lg border p-4">
        {!order ? (
          <p className="text-sm text-muted-foreground">Loading...</p>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              {new Date(order.createdAt).toLocaleString()} • {order.status}
            </p>
            {order.items.map((i) => (
              <div
                key={`${i.id}-${i.size ?? "_"}`}
                className="flex items-center gap-3"
              >
                <img src={i.image} className="h-16 w-12 rounded object-cover" />
                <div className="flex-1">
                  <p className="font-medium">{i.title}</p>
                  <p className="text-sm text-muted-foreground">
                    x{i.qty} • Size {i.size ?? "-"}
                  </p>
                </div>
                <div>₹{i.price * i.qty}</div>
              </div>
            ))}
            <div className="mt-4 text-right font-semibold">
              Total: ₹{order.total}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
