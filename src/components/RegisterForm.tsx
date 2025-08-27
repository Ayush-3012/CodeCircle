/* eslint-disable prefer-const */
"use client";

import { useState } from "react";
import { RegisterFormData } from "@/utils/types/users";
import { motion } from "framer-motion";
import Image from "next/image";
import Loader from "@/partials/Loader";
import { FaEye, FaEyeSlash } from "react-icons/fa";

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
  const [formData, setFormData] = useState<
    RegisterFormData & { confirmPassword?: string }
  >(
    initialData || {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      image: "",
      bio: "",
      githubUrl: "",
      linkedInUrl: "",
      portfolioUrl: "",
    }
  );

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [viewPassword, setViewPassword] = useState(false);
  const [viewConfirmPassword, setViewConfirmPassword] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // simple check confirm password
    if (!isEdit && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    let submitData: any = new FormData();

    for (const key in formData) {
      if (key === "image" || key === "confirmPassword") continue;
      submitData.append(key, formData[key as keyof RegisterFormData] || "");
    }

    if (imageFile) {
      submitData.append("image", imageFile);
    }

    await onSubmit(submitData);
  };

  if (loading) return <Loader />;

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
        className="w-full px-4 py-3 rounded-md bg-nav text-primary placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      {!isEdit && (
        <input
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          className="w-full px-4 py-3 rounded-md bg-nav text-primary placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
            className="w-full px-4 py-3 rounded-md bg-nav text-primary placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {/* Password */}
          <div className="relative">
            <input
              name="password"
              type={viewPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-4 py-3 rounded-md bg-nav text-primary placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-12"
            />
            {viewPassword ? (
              <FaEyeSlash
                onClick={() => setViewPassword(!viewPassword)}
                className="absolute right-4 bottom-3 text-2xl cursor-pointer text-secondary hover:text-emerald-400 transition"
              />
            ) : (
              <FaEye
                onClick={() => setViewPassword(!viewPassword)}
                className="absolute right-4 bottom-3 text-2xl cursor-pointer text-secondary hover:text-emerald-400 transition"
              />
            )}
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              name="confirmPassword"
              type={viewConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="w-full px-4 py-3 rounded-md bg-nav text-primary placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-12"
            />
            {viewConfirmPassword ? (
              <FaEyeSlash
                onClick={() => setViewConfirmPassword(!viewConfirmPassword)}
                className="absolute right-4 bottom-3 text-2xl cursor-pointer text-secondary hover:text-emerald-400 transition"
              />
            ) : (
              <FaEye
                onClick={() => setViewConfirmPassword(!viewConfirmPassword)}
                className="absolute right-4 bottom-3 text-2xl cursor-pointer text-secondary hover:text-emerald-400 transition"
              />
            )}
          </div>
        </>
      )}

      <textarea
        name="bio"
        value={formData.bio}
        onChange={handleChange}
        placeholder="Bio"
        rows={2}
        className="w-full px-4 py-3 rounded-md bg-nav text-primary placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      {/* 🖼️ IMAGE UPLOAD */}
      <div className="flex flex-col gap-2">
        <label>Profile Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0] || null;
            setImageFile(file);
          }}
          className="block w-full text-sm text-secondary file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-emerald-600 file:text-white hover:file:bg-emerald-700"
        />

        {/* Preview */}
        {(imageFile || formData.image) && (
          <div className="w-32 h-32 relative border border-emerald-600 rounded-md overflow-hidden">
            <Image
              src={
                imageFile
                  ? URL.createObjectURL(imageFile)
                  : typeof formData.image === "string" && formData.image
                  ? formData.image
                  : "/default-profile.png"
              }
              alt="Profile preview"
              fill
              className="object-cover"
            />
          </div>
        )}
      </div>

      <input
        name="githubUrl"
        value={formData.githubUrl}
        onChange={handleChange}
        placeholder="GitHub URL"
        className="w-full px-4 py-3 rounded-md bg-nav text-primary placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <input
        name="linkedInUrl"
        value={formData.linkedInUrl}
        onChange={handleChange}
        placeholder="LinkedIn URL"
        className="w-full px-4 py-3 rounded-md bg-nav text-primary placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
