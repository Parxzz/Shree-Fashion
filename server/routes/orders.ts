import { RequestHandler } from "express";
import { z } from "zod";
import { readJSON, writeJSON } from "../lib/db";
import { getUserIdFromAuth } from "./auth";

interface OrderItem {
  id: string;
  title: string;
  price: number;
  image: string;
  qty: number;
  size?: string;
}
interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  createdAt: string;
  status: "processing" | "shipped" | "delivered";
}

const createOrderSchema = z.object({
  items: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      price: z.number(),
      image: z.string(),
      qty: z.number().min(1),
      size: z.string().optional(),
    }),
  ),
  address: z.object({
    name: z.string(),
    line1: z.string(),
    city: z.string(),
    zip: z.string(),
  }),
});

export const listOrders: RequestHandler = (req, res) => {
  const userId = getUserIdFromAuth(req.headers.authorization);
  if (!userId) return res.status(401).json({ error: "Unauthorized" });
  const orders = readJSON<Order[]>("orders.json", []);
  res.json(orders.filter((o) => o.userId === userId));
};

export const getOrder: RequestHandler = (req, res) => {
  const userId = getUserIdFromAuth(req.headers.authorization);
  if (!userId) return res.status(401).json({ error: "Unauthorized" });
  const orders = readJSON<Order[]>("orders.json", []);
  const order = orders.find(
    (o) => o.id === req.params.id && o.userId === userId,
  );
  if (!order) return res.status(404).json({ error: "Not found" });
  res.json(order);
};

export const createOrder: RequestHandler = (req, res) => {
  const userId = getUserIdFromAuth(req.headers.authorization);
  if (!userId) return res.status(401).json({ error: "Unauthorized" });
  const parsed = createOrderSchema.safeParse(req.body);
  if (!parsed.success)
    return res.status(400).json({ error: "Invalid payload" });
  const orders = readJSON<Order[]>("orders.json", []);
  const items = parsed.data.items as unknown as OrderItem[];
  const total = items.reduce((s, i) => s + i.qty * i.price, 0);
  const id = `SF-${1000 + orders.length + 1}`;
  const order: Order = {
    id,
    userId,
    items,
    total,
    createdAt: new Date().toISOString(),
    status: "processing",
  };
  orders.push(order);
  writeJSON("orders.json", orders);
  res.json(order);
};
