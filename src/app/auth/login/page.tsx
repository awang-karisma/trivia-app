"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useLocalStorage } from "@/lib/storage";
import { generateSHA256Hash } from "@/lib/utils";
import type { Session } from "@/types/Session";
import type { User } from "@/types/User";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("test@example.com");
  const [password, setPassword] = useState("test");
  const [userDb] = useLocalStorage<User[]>("user", []);
  const [userState, setUserState] = useLocalStorage<Session>("session", {});

  useEffect(() => {
    if (userState.isLoggedIn) setTimeout(() => router.push("/quiz"), 2000);
  }, [userState, router]);

  const handleLoginButton = async () => {
    const user = userDb.find((user) => user.email === email);
    if (!user) {
      setUserState({});
      return toast.error(`Can't find user ${email}`);
    }

    const hashedPassword = await generateSHA256Hash(`${user.salt}${password}`);
    if (hashedPassword !== user.password) {
      setUserState({});
      return toast.error(`Incorrect password`);
    }

    toast.success(`Welcome, ${email}! Redirecting to quiz page...`);
    setUserState({ email, isLoggedIn: true });
  };

  return (
    <Card className="w-full sm:w-lg">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Enter your credentials below to start playing trivia
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <Field>
            <FieldLabel>Email</FieldLabel>
            <Input
              type="email"
              placeholder="user@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Field>
          <Field>
            <FieldLabel>Password</FieldLabel>
            <Input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Field>
          <Field>
            <Button onClick={handleLoginButton}>Login</Button>
            <Button
              variant={"secondary"}
              onClick={() => router.push("/auth/register")}
            >
              Register
            </Button>
          </Field>
        </FieldGroup>
      </CardContent>
    </Card>
  );
}
