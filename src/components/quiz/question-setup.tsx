"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
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

export default function QuestionSetup({
  categories,
}: {
  categories: { trivia_categories: Array<{ id: number; name: string }> };
}) {
  const router = useRouter();
  const [difficulty, setDifficulty] = useState("");
  const [category, setCategory] = useState("");
  const [quizType, setQuizType] = useState("");
  const [duration, setDuration] = useState(90);

  const handleSubmitButton = async () => {
    const searchParams = new URLSearchParams();
    if (difficulty !== "any" && difficulty !== "")
      searchParams.append("difficulty", difficulty);
    if (category !== "any" && category !== "")
      searchParams.append("category", category);
    if (quizType !== "any" && quizType !== "")
      searchParams.append("quizType", quizType);
    searchParams.append("duration", (duration > 0 ? duration : 90).toString());
    router.push(`/quiz/start?${searchParams.toString()}`);
  };

  return (
    <Card className="w-full sm:w-xl">
      <CardHeader>
        <CardTitle className="text-2xl">Trivia App</CardTitle>
        <CardDescription className="text-lg">
          Configure timer, category, difficulty, and type of trivia you want to
          play today!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup className="grid grid-cols-1 sm:grid-cols-2">
          <Field>
            <FieldLabel>Category</FieldLabel>
            <Select
              name="category"
              value={category}
              onValueChange={(v) => setCategory(v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any Category</SelectItem>
                {categories.trivia_categories.map((category) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field>
            <FieldLabel>Difficulty</FieldLabel>
            <Select
              name="difficulty"
              value={difficulty}
              onValueChange={(v) => setDifficulty(v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any Difficulty</SelectItem>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field>
            <FieldLabel>Type</FieldLabel>
            <Select
              name="type"
              value={quizType}
              onValueChange={(v) => setQuizType(v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any Type</SelectItem>
                <SelectItem value="multiple">Multiple Choice</SelectItem>
                <SelectItem value="boolean">True / False</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field>
            <FieldLabel>Duration (second)</FieldLabel>
            <Input
              name="duration"
              required
              type="number"
              value={duration}
              onChange={(e) => setDuration(Number.parseInt(e.target.value, 10))}
            ></Input>
          </Field>
        </FieldGroup>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmitButton}>Play Now!</Button>
      </CardFooter>
    </Card>
  );
}
