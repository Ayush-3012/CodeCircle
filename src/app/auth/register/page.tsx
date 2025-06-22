"use client";

import { registerUser } from "@/services/authService";
import { useRouter } from "next/navigation";
import { useState } from "react";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = registerUser(formData);
      console.log("✅ User registered", res);
      router.push("/auth/login");
    } catch (error: any) {
      console.error(
        "❌ Error:",
        error?.response?.data?.message || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="max-w-md mx-auto mt-10 p-4 border rounded">
        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-black p-6 rounded shadow-md w-full max-w-md"
        >
          <h2 className="text-xl font-semibold mb-4">Register</h2>
          <input
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="border w-full px-4 py-2"
          />
          <input
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            className="border w-full px-4 py-2"
          />

          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="border w-full px-4 py-2"
          />

          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="border w-full px-4 py-2"
          />

          <input
            name="image"
            type="text"
            value={formData.image}
            onChange={handleChange}
            placeholder="Image URL (optional)"
            className="border w-full px-4 py-2"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded w-full"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </>
  );
};

export default RegisterPage;
