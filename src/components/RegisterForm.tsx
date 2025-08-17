"use client";

import { useState } from "react";
import { RegisterFormData } from "@/utils/types/users";
import { motion } from "framer-motion";

type RegisterFormProps = {
  initialData?: RegisterFormData;
  onSubmit: (data: RegisterFormData) => Promise<void>;
  isEdit?: boolean;
  loading?: boolean;
};

const RegisterForm = ({
  initialData,
  onSubmit,
  isEdit = false,
  loading = false,
}: RegisterFormProps) => {
  const [formData, setFormData] = useState<RegisterFormData>(
    initialData || {
      name: "",
      username: "",
      email: "",
      password: "",
      image: "",
      bio: "",
      githubUrl: "",
      linkedInUrl: "",
      portfolioUrl: "",
    }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-2 p rounded-2xl w-full max-w-xl custom-font"
    >
      <h2 className="text-2xl font-bold mb-6 underline text-primary text-center">
        {isEdit ? "Edit Profile" : "Register"}
      </h2>

      {/* Inputs */}
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        className="w-full px-4 py-3 rounded-md bg-nav  text-primary placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      {!isEdit && (
        <input
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          className="w-full px-4 py-3 rounded-md bg-nav  text-primary placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      )}

      {!isEdit && (
        <>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full px-4 py-3 rounded-md bg-nav  text-primary placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full px-4 py-3 rounded-md bg-nav  text-primary placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </>
      )}

      <textarea
        name="bio"
        value={formData.bio}
        onChange={handleChange}
        placeholder="Bio"
        rows={2}
        className="w-full px-4 py-3 rounded-md bg-nav  text-primary placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <input
        name="image"
        value={formData.image}
        onChange={handleChange}
        placeholder="Image URL"
        className="w-full px-4 py-3 rounded-md bg-nav  text-primary placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <input
        name="githubUrl"
        value={formData.githubUrl}
        onChange={handleChange}
        placeholder="GitHub URL"
        className="w-full px-4 py-3 rounded-md bg-nav  text-primary placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <input
        name="linkedInUrl"
        value={formData.linkedInUrl}
        onChange={handleChange}
        placeholder="LinkedIn URL"
        className="w-full px-4 py-3 rounded-md bg-nav  text-primary placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <input
        name="portfolioUrl"
        value={formData.portfolioUrl}
        onChange={handleChange}
        placeholder="Portfolio URL"
        className="w-full px-4 py-3 rounded-md bg-nav text-primary placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      {/* Button */}
      <motion.button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-md border cursor-pointer font-semibold hover-gradient"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.6, bounce: 0.6, type: "spring" }}
      >
        {loading
          ? isEdit
            ? "Updating..."
            : "Registering..."
          : isEdit
          ? "Update Profile"
          : "Register"}
      </motion.button>
    </form>
  );
};

export default RegisterForm;
