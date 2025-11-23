"use client";

import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const signIn = async () => {
    const { data, error } = await authClient.signIn.email({
      email,
      password,
    });
    if (error) {
      setError(error.message || "An error occurred");
    } else {
      router.push("/");
    }
  };

  return (
    <div className="flex flex-col gap-4 max-w-sm mx-auto mt-10 p-6 border rounded-lg shadow-md">
      <h1 className="text-2xl font-bold">Sign In</h1>
      {error && <div className="text-red-500">{error}</div>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input input-bordered w-full"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input input-bordered w-full"
      />
      <button onClick={signIn} className="btn btn-primary w-full">
        Sign In
      </button>
    </div>
  );
}
