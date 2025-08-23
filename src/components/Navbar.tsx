"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import { useAuth } from "@/lib/hooks/useAuth";
import { RootState } from "@/lib/redux/store";

const Navbar = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const auth = useAuth();

  return (
    <>
      <nav className="flex flex-col gap-4 text-lg font-medium custom-font">
        <Link
          href="/"
          className="text-2xl font-extrabold mb-6 hover:text-emerald-400 transition-colors"
        >
          CodeCircle
        </Link>

        {user ? (
          <>
            <Link
              href="/feed"
              className="group shadow-emerald-400 shadow-[0_0_5px] cursor-pointer px-2 py-1 rounded-md"
            >
              <p className="group-hover:text-emerald-400 group-hover:-translate-y-1.5 transition-all">
                📰 Feed
              </p>
            </Link>
            <Link
              href="/chat"
              className="group shadow-emerald-400 shadow-[0_0_5px] cursor-pointer px-2 py-1 rounded-md"
            >
              <p className="group-hover:text-emerald-400 group-hover:-translate-y-1.5 transition-all">
                💬 Chat
              </p>
            </Link>
            <Link
              href={`/profile/${user}`}
              className="group shadow-emerald-400 shadow-[0_0_5px] cursor-pointer px-2 py-1 rounded-md"
            >
              <p className="group-hover:text-emerald-400 group-hover:-translate-y-1.5 transition-all">
                👤 Profile
              </p>
            </Link>
            <button
              className="group mt-4 text-left shadow-rose-400 shadow-[0_0_5px] cursor-pointer px-2 py-1 rounded-md"
              onClick={async () => await auth?.logout()}
            >
              <p className="group-hover:text-rose-400 group-hover:-translate-y-1.5 transition-all">
                🚪 Logout
              </p>
            </button>
          </>
        ) : (
          <>
            <Link
              href="/auth/login"
              className="group shadow-emerald-400 shadow-[0_0_5px] cursor-pointer px-2 py-1 rounded-md"
            >
              <p className="group-hover:text-emerald-400 group-hover:-translate-y-1.5 transition-all">
                🔑 Login
              </p>
            </Link>
            <Link
              href="/auth/register"
              className="group shadow-emerald-400 shadow-[0_0_5px] cursor-pointer px-2 py-1 rounded-md"
            >
              <p className="group-hover:text-emerald-400 group-hover:-translate-y-1.5 transition-all">
                ✨ Register
              </p>
            </Link>
          </>
        )}

        <span className="text-sm text-secondary mt-6 md:hidden">
          Sidebar hidden on mobile
        </span>
      </nav>
    </>
  );
};

export default Navbar;
