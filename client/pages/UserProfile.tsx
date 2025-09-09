import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateProfile, logout } from "@/features/auth/authSlice";
import { useNavigate } from "react-router-dom";

export default function UserProfile() {
  const auth = useAppSelector((s) => s.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState(auth.user?.name || "");
  const [email] = useState(auth.user?.email || "");

  useEffect(() => {
    if (!auth.user) navigate("/login");
  }, [auth.user]);

  if (!auth.user) return null;

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-semibold">Your Profile</h1>
      <div className="mt-6 grid max-w-md gap-4">
        <div>
          <label className="text-sm">Full Name</label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label className="text-sm">Email</label>
          <Input value={email} disabled />
        </div>
        <div className="flex gap-2">
          <Button onClick={() => dispatch(updateProfile({ name }))}>
            Save
          </Button>
          <Button variant="outline" onClick={() => navigate("/orders")}>
            Order History
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              dispatch(logout());
              navigate("/");
            }}
          >
            Logout
          </Button>
        </div>
      </div>
    </main>
  );
}
