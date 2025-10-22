"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function QuizIndex() {
  const router = useRouter();
  return (
    <Card className="w-full sm:w-xl">
      <CardHeader>
        <CardTitle className="text-lg text-muted-foreground">
          Trivia App
        </CardTitle>
        <CardDescription className="text-2xl text-foreground">
          Configure timer, category, difficulty, and type of trivia you want to
          play today!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup className="grid grid-cols-1 sm:grid-cols-2">
          <Field>
            <FieldLabel>Category</FieldLabel>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Select 1</SelectItem>
                <SelectItem value="2">Select 2</SelectItem>
                <SelectItem value="3">Select 3</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field>
            <FieldLabel>Difficulty</FieldLabel>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Select 1</SelectItem>
                <SelectItem value="2">Select 2</SelectItem>
                <SelectItem value="3">Select 3</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field>
            <FieldLabel>Type</FieldLabel>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Select 1</SelectItem>
                <SelectItem value="2">Select 2</SelectItem>
                <SelectItem value="3">Select 3</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field>
            <FieldLabel>Duration (second)</FieldLabel>
            <Input></Input>
          </Field>
        </FieldGroup>
      </CardContent>
      <CardFooter>
        <Button onClick={() => router.push("/quiz/start")}>Play Now!</Button>
      </CardFooter>
    </Card>
  );
}
