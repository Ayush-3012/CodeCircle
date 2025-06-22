import { logoutUser } from "@/services/authService";
import { getCurrentUser } from "@/utils/getCurrentUser";
import Link from "next/link";

export default async function Navbar() {
  const user = await getCurrentUser();

  return (
    <>
      <nav className="flex justify-between p-4 border-b">
        <Link href="/" className="text-xl font-bold hover:text-blue-400">
          CodeCircle
        </Link>

        <div className="flex gap-4">
          {user ? (
            <>
              <Link
                href="/create-post"
                className="hover:text-blue-500 transition"
              >
                Create Post
              </Link>
              <Link href="/profile" className="hover:text-blue-500 transition">
                Profile
              </Link>
              <form action="/api/auth/logout" method="POST">
                <button
                  type="submit"
                  className="hover:text-blue-500 transition cursor-pointer"
                >
                  Logout
                </button>
              </form>
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
}
