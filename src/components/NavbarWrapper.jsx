"use client";

import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import { isUserLoggedIn } from "@/services/authService";

const NavbarWrapper = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const check = async () => {
      const res = await isUserLoggedIn();
      if (res.userId) setUser(res.userId);
    };
    check();
  }, []);

  return <Navbar user={user} setUser={setUser} />;
};

export default NavbarWrapper;
