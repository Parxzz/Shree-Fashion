import { RequestHandler } from "express";
import crypto from "crypto";
import { z } from "zod";
import { readJSON, writeJSON } from "../lib/db";

interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
}
interface Token {
  token: string;
  userId: string;
  createdAt: number;
}

const registerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
});
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

function hash(pw: string) {
  return crypto.createHash("sha256").update(pw).digest("hex");
}

export const register: RequestHandler = (req, res) => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success)
    return res.status(400).json({ error: "Invalid payload" });

  const users = readJSON<User[]>("users.json", []);
  if (users.some((u) => u.email === parsed.data.email))
    return res.status(409).json({ error: "Email already registered" });

  const user: User = {
    id: crypto.randomUUID(),
    name: parsed.data.name,
    email: parsed.data.email,
    passwordHash: hash(parsed.data.password),
  };
  users.push(user);
  writeJSON("users.json", users);

  const token = issueToken(user.id);
  res.json({
    token: token.token,
    user: { id: user.id, name: user.name, email: user.email },
  });
};

export const login: RequestHandler = (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success)
    return res.status(400).json({ error: "Invalid payload" });
  const users = readJSON<User[]>("users.json", []);
  const user = users.find(
    (u) =>
      u.email === parsed.data.email &&
      u.passwordHash === hash(parsed.data.password),
  );
  if (!user) return res.status(401).json({ error: "Invalid credentials" });
  const token = issueToken(user.id);
  res.json({
    token: token.token,
    user: { id: user.id, name: user.name, email: user.email },
  });
};

function issueToken(userId: string): Token {
  const tokens = readJSON<Token[]>("tokens.json", []);
  const t: Token = {
    token: crypto.randomBytes(24).toString("hex"),
    userId,
    createdAt: Date.now(),
  };
  tokens.push(t);
  writeJSON("tokens.json", tokens);
  return t;
}

export const me: RequestHandler = (req, res) => {
  const userId = getUserIdFromAuth(req.headers.authorization);
  if (!userId) return res.status(401).json({ error: "Unauthorized" });
  const users = readJSON<User[]>("users.json", []);
  const user = users.find((u) => u.id === userId);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json({ id: user.id, name: user.name, email: user.email });
};

export function getUserIdFromAuth(authHeader?: string) {
  if (!authHeader) return null;
  const [type, token] = authHeader.split(" ");
  if (type !== "Bearer" || !token) return null;
  const tokens = readJSON<Token[]>("tokens.json", []);
  const hit = tokens.find((t) => t.token === token);
  return hit?.userId ?? null;
}
