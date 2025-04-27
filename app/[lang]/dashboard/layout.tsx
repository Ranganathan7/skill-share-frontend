"use client";

import { authCookieKey } from "@/middleware";
import { setAuthorization } from "@/store/slices/headers";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useAppDispatch } from "@/lib/hooks/redux-toolkit";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const alreadyLoggedIn = Cookies.get(authCookieKey);
    if (alreadyLoggedIn) {
      dispatch(setAuthorization(alreadyLoggedIn));
    }
  }, []);
  return <div>{children}</div>;
}
