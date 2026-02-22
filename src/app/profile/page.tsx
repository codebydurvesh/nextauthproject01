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
    <div className="flex flex-col gap-2 border border-gray rounded-mb items-center justify-center">
      <h1 className="p-2 text-2xl">Profile page</h1>
      <p className="p-2 text-mb">username: {loading ? "loading" : username}</p>
      <p className="p-2 text-mb">email: {loading ? "loading" : email}</p>
      <button
        className="p-3 w-25 mb-10 bg-red-600 text-white text-md rounded-2xl"
        onClick={logoutHandler}
      >
        logout
      </button>
    </div>
  );
}
