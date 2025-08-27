/* eslint-disable @typescript-eslint/no-unused-vars */
// CLIENT COMPONENT FOR LOGIN

"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "@/lib/hooks/useAuth";
import { motion } from "framer-motion";
import Loader from "@/partials/Loader";
import Link from "next/link";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const auth = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await auth?.login({ email, password });
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <>
      <div className="flex items-center flex-col justify-center custom-font min-h-screen px-4">
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-4 p-6 rounded-2xl w-full max-w-md shadow-[0_0_10px]"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, type: "spring", bounce: 0.6 }}
        >
          <h1 className="text-2xl font-bold mb-6 underline text-primary text-center">
            Login
          </h1>

          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-md bg-nav text-primary placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-md bg-nav text-primary placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <motion.button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-md border cursor-pointer font-semibold hover-gradient disabled:opacity-50"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4, type: "spring" }}
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>
        </motion.form>
        <p className="text-secondary text-base text-center mt-4">
          New User?{" "}
          <Link
            href="/auth/register"
            className="hover:text-sky-400 hover:underline transition"
          >
            Register here
          </Link>
        </p>
      </div>
    </>
  );
};

export default LoginPage;
