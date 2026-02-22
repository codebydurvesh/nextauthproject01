"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Page() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`/api/users/signup`, user);
      console.log("Signup Success: ", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed");
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-50">
            {loading ? "Processing..." : "Create account"}
          </h1>
          <p className="text-sm text-zinc-500">Get started with your account</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label
              htmlFor="username"
              className="block text-xs font-medium text-zinc-400 uppercase tracking-wider"
            >
              Username
            </label>
            <input
              className="w-full px-3 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 transition-colors"
              id="username"
              type="text"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              placeholder="johndoe"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="block text-xs font-medium text-zinc-400 uppercase tracking-wider"
            >
              Email
            </label>
            <input
              className="w-full px-3 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 transition-colors"
              id="email"
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="you@example.com"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="password"
              className="block text-xs font-medium text-zinc-400 uppercase tracking-wider"
            >
              Password
            </label>
            <input
              className="w-full px-3 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 transition-colors"
              id="password"
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
            />
          </div>

          <button
            onClick={onSignup}
            disabled={buttonDisabled}
            className="w-full px-4 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-200 cursor-pointer"
          >
            {buttonDisabled ? "Fill in all fields" : "Create account"}
          </button>
        </div>

        <p className="text-center text-sm text-zinc-500">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-blue-500 hover:text-blue-400 transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
