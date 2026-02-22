import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="space-y-3">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-zinc-800/60 border border-zinc-700/50 mb-2">
            <svg
              className="w-7 h-7 text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-50">
            Auth App
          </h1>
          <p className="text-zinc-500 text-sm leading-relaxed">
            Secure authentication system built with Next.js
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Link
            href="/login"
            className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-500 transition-colors duration-200"
          >
            Sign in
          </Link>
          <Link
            href="/signup"
            className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-zinc-800 text-zinc-300 text-sm font-medium border border-zinc-700/50 hover:bg-zinc-700/60 hover:text-zinc-100 transition-colors duration-200"
          >
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
}
