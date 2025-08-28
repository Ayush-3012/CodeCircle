"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  isUserLoggedIn,
  loginUser,
  logoutUser,
  registerUser,
} from "../client/services/authService";
import toast from "react-hot-toast";
import { removeUser, setUser } from "../redux/slices/authSlice";
import { socket } from "@/lib/socket";

export const useAuth = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  useEffect(() => {
    let ignore = false;
    const checkStatus = async () => {
      if (!ignore) {
        try {
          const res = await isUserLoggedIn();
          const userId = res?.data?.user?.id;
          dispatch(setUser(userId));
          if (socket && userId) socket.emit("userOnline", userId);

          if (socket) {
            socket.on("onlineUsers", (users: string[]) => {
              setOnlineUsers(users);
            });
          }
        } catch (error: any) {
          toast.error(`${error?.response?.data?.message}, Please Login`, {
            id: "auth-error",
          });
        }
      }
    };
    checkStatus();

    return () => {
      ignore = true;
      if (socket) socket.off("onlineUsers");
    };
  }, [dispatch, router]);

  const login = async (data: any) => {
    try {
      const res = await loginUser(data);
      const userId = res.data.userId;
      dispatch(setUser(userId));

      if (socket && userId) {
        socket.emit("userOnline", userId);
      }
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
      if (socket) socket.emit("userOffline");
      toast.success(res.data.message);
      dispatch(removeUser());
      router.push("/");
    } catch (error: any) {
      toast.error(`${error.response.data.message}`);
    }
  };

  return { login, register, logout, onlineUsers };
};
