"use client"
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter()
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
            <Input type="email" placeholder="user@example.com" required />
          </Field>
          <Field>
            <FieldLabel>Password</FieldLabel>
            <Input type="password" required />
          </Field>
          <Field>
            <Button>Login</Button>
            <Button variant={"secondary"} onClick={() => router.push('/auth/register')}>Register</Button>
          </Field>
        </FieldGroup>
      </CardContent>
    </Card>
  );
}
