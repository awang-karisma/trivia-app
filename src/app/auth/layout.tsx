"use client";

import { useEffect } from "react";
import { deleteStorageKey, useLocalStorage } from "@/lib/storage";
import type { Session } from "@/types/Session";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [userState, setUserState] = useLocalStorage<Session>("session", {});
  useEffect(() => {
    setUserState(userState);
    deleteStorageKey("timer");
    deleteStorageKey("questions");
    deleteStorageKey("questionIndex");
  }, [userState, setUserState]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      {children}
    </div>
  );
}
