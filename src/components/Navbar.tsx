"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import { useAuth } from "@/lib/hooks/useAuth";
import { RootState } from "@/lib/redux/store";
import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineMessage,
  AiOutlineUser,
  AiOutlineLogin,
  AiOutlineLogout,
  AiOutlineUserAdd,
} from "react-icons/ai";

const Navbar = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const auth = useAuth();
  const [loading, setLoading] = useState(false);

  const navItems = user
    ? [
        { href: "/feed", label: "Feed", icon: <AiOutlineHome size={24} /> },
        { href: "/chat", label: "Chat", icon: <AiOutlineMessage size={24} /> },
        {
          href: `/profile/${user}`,
          label: "Profile",
          icon: <AiOutlineUser size={24} />,
        },
      ]
    : [
        {
          href: "/auth/login",
          label: "Login",
          icon: <AiOutlineLogin size={24} />,
        },
        {
          href: "/auth/register",
          label: "Register",
          icon: <AiOutlineUserAdd size={24} />,
        },
      ];

  return (
    <>
      {/* Desktop / Sidebar Navbar */}
      <nav className="hidden md:flex flex-col gap-4 text-lg font-medium custom-font text-primary">
        <Link
          href="/"
          className="text-2xl font-extrabold mb-6 hover:text-emerald-400 transition-colors"
        >
          CodeCircle
        </Link>

        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="group shadow-emerald-400 shadow-[0_0_5px] cursor-pointer px-2 py-1 rounded-md"
          >
            <p className="flex items-center gap-2 group-hover:text-emerald-400 group-hover:-translate-y-1.5 transition-all">
              {item.icon} {item.label}
            </p>
          </Link>
        ))}

        {user && (
          <button
            className="group mt-4 text-left shadow-rose-400 shadow-[0_0_5px] cursor-pointer px-2 py-1 rounded-md"
            onClick={async () => {
              try {
                setLoading(true);
                await auth?.logout();
              } catch (error) {
                console.error("Logout failed:", error);
              } finally {
                setLoading(false);
              }
            }}
          >
            <p className="flex items-center gap-2 group-hover:text-rose-400 group-hover:-translate-y-1.5 transition-all">
              <AiOutlineLogout size={24} />{" "}
              {loading ? "Logging out..." : "Logout"}
            </p>
          </button>
        )}
      </nav>

      {/* Mobile / Bottom Navbar */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-nav border-t p-2 flex justify-around text-primary z-50">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex flex-col items-center text-sm"
          >
            {item.icon}
            <span className="mt-1">{item.label}</span>
          </Link>
        ))}

        {user && (
          <button
            onClick={async () => {
              try {
                setLoading(true);
                await auth?.logout();
              } catch (error) {
                console.error("Logout failed:", error);
              } finally {
                setLoading(false);
              }
            }}
            className="flex flex-col items-center text-sm"
          >
            <AiOutlineLogout size={24} />
            <span>{loading ? "..." : "Logout"}</span>
          </button>
        )}
      </nav>
    </>
  );
};

export default Navbar;
