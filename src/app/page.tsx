// app/page.tsx // CLIENT COMPONENT FOR HOME PAGE
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/hooks/useAuth";

export default function Home() {
  useAuth();

  const MotionLink = motion(Link);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-primary p-6">
      <h1 className="text-5xl font-extrabold text-shadow-emerald-400 text-shadow-md mb-4">
        Welcome to CodeCircle
      </h1>
      <p className="text-lg mb-8 text-primary text-center max-w-xl">
        Connect with developers around the world. Share your thoughts,
        collaborate, and grow your coding network.
      </p>

      <div className="flex space-x-4">
        <MotionLink
          href="/auth/login"
          className="hover-gradient border px-8 py-4 rounded-lg text-2xl font-semibold"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6, bounce: 0.6, type: "spring" }}
        >
          Login
        </MotionLink>
        <MotionLink
          href="/auth/register"
          className="hover-gradient border px-8 py-4 rounded-lg text-2xl font-semibold"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6, bounce: 0.6, type: "spring" }}
        >
          Register
        </MotionLink>
      </div>

      <div className="mt-12 text-base text-secondary text-center max-w-md">
        Once logged in, you&apos;ll be redirected to the developer feed where
        you can post, like, and interact with others. Join now and be part of
        the CodeCircle community!
      </div>
    </main>
  );
}
