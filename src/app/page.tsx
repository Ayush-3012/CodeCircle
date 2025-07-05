// app/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { isUserLoggedIn } from "@/services/authService";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const checkAuth = async () => {
      const res = await isUserLoggedIn();

      if (res.userId) {
        router.push("/feed");
      }
    };
    checkAuth();
  }, [router]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-[#0f172a] text-white p-6">
      <h1 className="text-5xl font-extrabold mb-4">Welcome to CodeCircle</h1>
      <p className="text-lg mb-8 text-gray-300 text-center max-w-xl">
        Connect with developers around the world. Share your thoughts,
        collaborate, and grow your coding network.
      </p>

      <div className="flex space-x-4">
        <Link
          href="/auth/login"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold"
        >
          Login
        </Link>
        <Link
          href="/auth/register"
          className="bg-transparent border border-white px-6 py-2 rounded-lg font-semibold hover:bg-white hover:text-black transition"
        >
          Register
        </Link>
      </div>

      <div className="mt-12 text-sm text-gray-400 text-center max-w-md">
        Once logged in, you&apos;ll be redirected to the developer feed where
        you can post, like, and interact with others. Join now and be part of
        the CodeCircle community!
      </div>
    </main>
  );
}
