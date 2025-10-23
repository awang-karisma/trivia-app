"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useLocalStorage } from "@/lib/storage";
import type { Session } from "@/types/Session";

export default function QuizLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [userState] = useLocalStorage<Session>("session", {});
  const router = useRouter();
  const [isNotified, setIsnotified] = useState(false);
  useEffect(() => {
    if (!userState.isLoggedIn && !isNotified) {
      setIsnotified(true);
      setTimeout(() => {
        toast.info("Please login before continuing");
        router.push("/auth/login");
      }, 2000);
    }
  }, [userState, isNotified, router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      {children}
    </div>
  );
}
