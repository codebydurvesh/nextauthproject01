"use client";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function page() {
  //   const router = useRouter();
  const searchParams = useSearchParams();
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
      setError(false);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    setError(false);
    const urlToken: any = searchParams.get("token");
    setToken(urlToken);
  }, []);

  useEffect(() => {
    setError(false);
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-sm space-y-6 text-center">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-50">
            Email Verification
          </h1>
          <p className="text-sm text-zinc-500 font-mono truncate px-4">
            {token ? token : "No token found"}
          </p>
        </div>

        {verified && (
          <div className="space-y-4">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-500/10 border border-green-500/20">
              <svg
                className="w-6 h-6 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <p className="text-sm text-zinc-400">
              Your email has been verified successfully.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center justify-center w-full px-4 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-500 transition-colors duration-200"
            >
              Continue to sign in
            </Link>
          </div>
        )}

        {error && (
          <div className="space-y-3">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20">
              <svg
                className="w-6 h-6 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <p className="text-sm text-red-400">
              Verification failed. The token may be expired or invalid.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
