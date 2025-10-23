"use client"
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useLocalStorage } from "@/lib/storage";
import { generateSHA256Hash } from "@/lib/utils";
import { useState } from "react";

interface User {
  email: string;
  password: string;
  salt: string;
}

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const [userDb, setUserDb] = useLocalStorage<User[]>("user", [])

  const handleRegistration = async () => {
    if (password !== password2) {
      setErrorMessage("Password mismatch")
      return
    }

    if (Array.from(userDb).filter(u => u.email === email).length > 0) {
      setErrorMessage("Email already exists")
      return
    }
    setErrorMessage("")
    
    const salt = crypto.randomUUID()
    const hashedPassword = await generateSHA256Hash(`${salt}${password}`)

    setUserDb(Array.from(userDb).push({ email, password: hashedPassword, salt}))
  }

  return (
    <Card className="w-full sm:w-lg">
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>
          Register a new account to play trivia
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <Field>
            <FieldLabel>Email</FieldLabel>
            <Input type="email" placeholder="user@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </Field>
          <Field>
            <FieldLabel>Password</FieldLabel>
            <Input type="password" required value={password} onChange={(e) => setPassword(e.target.value) } />
          </Field>
          <Field>
            <FieldLabel>Repeat Password</FieldLabel>
            <Input type="password" required value={password2} onChange={(e) => setPassword2(e.target.value) } />
          </Field>
          <Field>
            <Button onClick={handleRegistration}>Register</Button>
          </Field>
        </FieldGroup>
      </CardContent>
    </Card>
  );
}
