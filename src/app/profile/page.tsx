"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  const [loading, setLoading] = useState(true);

  const getUserDetails = async () => {
    try {
      const response = await axios.get("/api/users/profile");
      setEmail(response.data.data.email);
      setUsername(response.data.data.username);
      //   console.log("Email: ", response.data.data.email);
      //   console.log("Username: ", response.data.data.username);
    } catch (error: any) {
      console.log("Profile Display Error: ", error.message);
    }
  };

  useEffect(() => {
    setLoading(true);
    getUserDetails();
  }, []);

  useEffect(() => {
    if (email.length > 0 && username.length > 0) {
      setLoading(false);
    }
  }, [email, username]);

  const logoutHandler = async () => {
    try {
      await axios.get("/api/users/logout");
      router.push("/login");
      alert("Logged out successfully");
    } catch (error: any) {
      console.log("Error logging out: ", error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-zinc-800/60 border border-zinc-700/50 mb-1">
            <span className="text-xl font-semibold text-blue-500">
              {loading ? "..." : username.charAt(0).toUpperCase()}
            </span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-50">
            Profile
          </h1>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg">
            <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
              Username
            </span>
            <span className="text-sm text-zinc-200">
              {loading ? "Loading..." : username}
            </span>
          </div>
          <div className="flex items-center justify-between px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg">
            <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
              Email
            </span>
            <span className="text-sm text-zinc-200">
              {loading ? "Loading..." : email}
            </span>
          </div>
        </div>

        <button
          className="w-full px-4 py-2.5 rounded-lg bg-red-600/10 text-red-500 text-sm font-medium border border-red-500/20 hover:bg-red-600/20 transition-colors duration-200 cursor-pointer"
          onClick={logoutHandler}
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
