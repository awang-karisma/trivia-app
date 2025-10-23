"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
  const [password2, setPassword2] = useState("test");

  const [userDb, setUserDb] = useLocalStorage<User[]>("user", []);

  const [_userState, setUserState] = useLocalStorage<Session>("session", {});

  const handleRegistration = async () => {
    if (password !== password2) {
      toast.error("Password mismatch");
      return;
    }

    if (userDb.filter((u) => u.email === email).length > 0) {
      toast.error("Email already exists");
      return;
    }

    const salt = crypto.randomUUID();
    const hashedPassword = await generateSHA256Hash(`${salt}${password}`);
    const newUserDb = [...userDb, { email, password: hashedPassword, salt }];
    setUserDb(newUserDb);
    setUserState({ email, isLoggedIn: true });
    toast.success(
      `User ${email} sucessfully created! Redirecting to quiz page...`,
    );
    setTimeout(() => {
      router.push("/quiz");
    }, 2000);
  };

  return (
    <Card className="w-full sm:w-lg">
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>Register a new account to play trivia</CardDescription>
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
            <FieldLabel>Repeat Password</FieldLabel>
            <Input
              type="password"
              required
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
          </Field>
          <Field>
            <Button onClick={handleRegistration}>Register</Button>
          </Field>
        </FieldGroup>
      </CardContent>
    </Card>
  );
}
