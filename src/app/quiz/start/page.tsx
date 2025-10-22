import QuestionBox from "@/components/quiz/question-box";
import type { TriviaResponse } from "@/types/OpenTDB";

export default async function QuizStart({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  "use server";
  const config = await searchParams;
  const url = `https://opentdb.com/api.php?amount=10&encode=base64&${new URLSearchParams(config).toString()}`;
  const data = await fetch(url, { cache: "no-cache" });
  const questions = (await data.json()) as TriviaResponse;

  return (
    <QuestionBox
      duration={Number.parseInt(config.duration, 10)}
      questions={questions}
    />
  );
}
