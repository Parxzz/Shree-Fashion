import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/app/store";
import { loginSuccess } from "@/features/auth/authSlice";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const box = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        box.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
      );
    });
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    if (!res.ok) return alert("Sign up failed");
    const data = await res.json();
    dispatch(loginSuccess(data));
    navigate("/profile");
  };

  return (
    <main className="mx-auto grid max-w-md place-items-center px-4 py-16">
      <div ref={box} className="w-full rounded-xl border p-6 shadow-sm">
        <h1 className="text-xl font-semibold">Create Account</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Sign up to save your cart and view orders.
        </p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-sm">Full Name</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              required
            />
          </div>
          <div>
            <label className="text-sm">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label className="text-sm">Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </form>
      </div>
    </main>
  );
}
