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
          className="text-2xl font-extrabold mb-6 hover:text-sky-400 transition-colors"
        >
          CodeCircle
        </Link>

        {user ? (
          <>
            <Link
              href="/feed"
              className="hover:text-sky-400 cursor-pointer transition-colors px-2 py-1 rounded-md"
            >
              📰 Feed
            </Link>
            <Link
              href="/chat"
              className="hover:text-sky-400 cursor-pointer transition-colors px-2 py-1 rounded-md"
            >
              💬 Chat
            </Link>
            <Link
              href={`/profile/${user}`}
              className="hover:text-sky-400 cursor-pointer transition-colors px-2 py-1 rounded-md"
            >
              👤 Profile
            </Link>
            <button
              className="mt-4 text-left transition-colors px-2 py-1 rounded-md"
              onClick={async () => await auth?.logout()}
            >
              🚪 Logout
            </button>
          </>
        ) : (
          <>
            <Link
              href="/auth/login"
              className="hover:text-sky-400 cursor-pointer transition-colors px-2 py-1 rounded-md"
            >
              🔑 Login
            </Link>
            <Link
              href="/auth/register"
              className="hover:text-sky-400 cursor-pointer transition-colors px-2 py-1 rounded-md"
            >
              ✨ Register
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
