"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";

export default function QuizFinish() {
  const router = useRouter();
  const params = useSearchParams();
  const unanswered = Number.parseInt(params.get("unanswered") ?? "0", 10);
  const correct = Number.parseInt(params.get("correct") ?? "0", 10);
  const incorrect = Number.parseInt(params.get("incorrect") ?? "0", 10);
  return (
    <Card className="w-full sm:w-2xl">
      <CardHeader>
        <CardTitle>Quiz Finished!</CardTitle>
        <CardDescription>
          Congratulations for answering all the questions!
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-3 gap-2">
        <Item variant={"outline"}>
          <ItemContent>
            <ItemTitle className="font-semibold">Jawaban Benar</ItemTitle>
            <ItemDescription className="text-5xl text-emerald-300">
              {correct}
            </ItemDescription>
          </ItemContent>
        </Item>
        <Item variant={"outline"}>
          <ItemContent>
            <ItemTitle className="font-semibold">Jawaban Salah</ItemTitle>
            <ItemDescription className="text-5xl text-rose-300">
              {incorrect}
            </ItemDescription>
          </ItemContent>
        </Item>
        <Item variant={"outline"}>
          <ItemContent>
            <ItemTitle className="font-semibold">Total Menjawab</ItemTitle>
            <ItemDescription className="text-5xl">{unanswered}</ItemDescription>
          </ItemContent>
        </Item>
      </CardContent>
      <CardFooter>
        <Button onClick={() => router.push("/quiz")}>Play Again</Button>
      </CardFooter>
    </Card>
  );
}
