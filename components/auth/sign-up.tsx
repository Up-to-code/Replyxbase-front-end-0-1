"use client";

import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const signUp = async () => {
    const { data, error } = await authClient.signUp.email({
      email,
      password,
      name,
    });
    if (error) {
      setError(error.message || "An error occurred");
    } else {
      router.push("/");
    }
  };

  return (
    <div className="flex flex-col gap-4 max-w-sm mx-auto mt-10 p-6 border rounded-lg shadow-md">
      <h1 className="text-2xl font-bold">Sign Up</h1>
      {error && <div className="text-red-500">{error}</div>}
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="input input-bordered w-full"
      />
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
      <button onClick={signUp} className="btn btn-primary w-full">
        Sign Up
      </button>
    </div>
  );
}
