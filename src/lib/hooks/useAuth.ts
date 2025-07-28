"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  isUserLoggedIn,
  loginUser,
  logoutUser,
  registerUser,
} from "../client/services/authService";
import toast from "react-hot-toast";
import { removeUser, setUser } from "../redux/slices/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    let ignore = false;
    const checkStatus = async () => {
      if (!ignore) {
        try {
          const res = await isUserLoggedIn();
          dispatch(setUser(res.data.user.id));
          router.push("/feed");
          toast.success("User LoggedIn, Redirecting to Feed");
        } catch (error: any) {
          console.log(error);
          //   toast.error(`${error.response.data.message}, Please Login`);
        }
      }
    };
    checkStatus();

    return () => {
      ignore = true;
    };
  }, [dispatch, router]);

  const login = async (data: any) => {
    try {
      const res = await loginUser(data);
      dispatch(setUser(res.data.userId));
      router.push("/feed");
      toast.success(res.data.message);
    } catch (error: any) {
      toast.error(`${error.response.data.message}`);
    }
  };

  const register = async (data: any) => {
    try {
      const res = await registerUser(data);
      toast.success(res.data.message);
      router.push("/auth/login");
    } catch (error: any) {
      toast.error(`${error.response.data.message}`);
    }
  };

  const logout = async () => {
    try {
      const res = await logoutUser();
      toast.success(res.data.message);
      dispatch(removeUser());
      router.push("/");
    } catch (error: any) {
      toast.error(`${error.response.data.message}`);
    }
  };

  return { login, register, logout };
};
