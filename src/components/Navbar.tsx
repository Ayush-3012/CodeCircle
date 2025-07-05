"use client";

import { logoutUser } from "@/services/authService";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = ({ user, setUser }: { user: any; setUser: any }) => {
  const router = useRouter();

  return (
    <>
      <nav className="flex justify-between p-4 border-b">
        <Link href="/" className="text-xl font-bold hover:text-blue-400">
          CodeCircle
        </Link>

        <div className=" flex gap-2 items-center justify-center">
          {user ? (
            <>
              <Link href="/feed" className="hover:text-blue-500 transition">
                Feed
              </Link>
              <Link href="/profile" className="hover:text-blue-500 transition">
                Profile
              </Link>
              <button
                className="hover:text-blue-500 transition cursor-pointer"
                onClick={async () => {
                  await logoutUser();
                  setUser(null);
                  router.push("/");
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="hover:text-blue-500 transition"
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                className="hover:text-blue-500 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
