"use client";

import { removeUser } from "@/lib/redux/slices/authSlice";
import { logoutUser } from "@/services/authService";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const user = useSelector((state: any) => state.auth.user);
  const dispatch = useDispatch();
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
              <Link href="/chat" className="hover:text-blue-500 transition">
                Chat
              </Link>
              <Link
                href={`/profile/${user}`}
                className="hover:text-blue-500 transition"
              >
                Profile
              </Link>
              <button
                className="hover:text-blue-500 transition cursor-pointer"
                onClick={async () => {
                  await logoutUser();
                  dispatch(removeUser());
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
