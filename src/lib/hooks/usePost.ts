"use client";

import { useRouter } from "next/navigation";
import {
  createPost,
  deletePost,
  updatePost,
} from "../client/services/postService";
import toast from "react-hot-toast";

export const usePost = () => {
  const router = useRouter();

  const create = async (formData: FormData) => {
    try {
      const res = await createPost(formData);
      toast.success(res?.data?.message);
      router.refresh();
    } catch (error: any) {
      toast.error(`${error.response.data.message}`);
    }
  };

  const update = async (id: string, formData: FormData) => {
    try {
      const res = await updatePost(id, formData);
      toast.success(res?.data?.message);
      router.refresh();
    } catch (error: any) {
      toast.error(`${error.response.data.message}`);
    }
  };

  const remove = async (id: string) => {
    try {
      const res = await deletePost(id);
      toast.success(res.data.message);
      router.refresh();
    } catch (error: any) {
      toast.error(`${error.response.data.message}`);
    }
  };

  return { create, update, remove };
};
