"use client";

import { useState } from "react";
import { RegisterFormData } from "@/utils/types/users";

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
      className="space-y-4 bg-black px-6 py-4 rounded shadow-md w-full max-w-md"
    >
      <h2 className="text-xl font-semibold mb-4">
        {isEdit ? "Edit Profile" : "Register"}
      </h2>

      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        className="border w-full px-4 py-2"
      />
      {!isEdit && (
        <input
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          className="border w-full px-4 py-2"
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
        </>
      )}

      <textarea
        name="bio"
        value={formData.bio}
        onChange={handleChange}
        placeholder="Bio"
        rows={2}
        className="border w-full px-4 py-2"
      />

      <input
        name="image"
        value={formData.image}
        onChange={handleChange}
        placeholder="Image URL"
        className="border w-full px-4 py-2"
      />
      <input
        name="githubUrl"
        value={formData.githubUrl}
        onChange={handleChange}
        placeholder="GitHub URL"
        className="border w-full px-4 py-2"
      />
      <input
        name="linkedInUrl"
        value={formData.linkedInUrl}
        onChange={handleChange}
        placeholder="LinkedIn URL"
        className="border w-full px-4 py-2"
      />
      <input
        name="portfolioUrl"
        value={formData.portfolioUrl}
        onChange={handleChange}
        placeholder="Portfolio URL"
        className="border w-full px-4 py-2"
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        {loading
          ? isEdit
            ? "Updating..."
            : "Registering..."
          : isEdit
          ? "Update Profile"
          : "Register"}
      </button>
    </form>
  );
};

export default RegisterForm;
