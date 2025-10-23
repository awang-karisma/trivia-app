"use client";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { useLocalStorage } from "@/lib/storage";
import type { TriviaQuestion, TriviaResponse } from "@/types/OpenTDB";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function QuestionBox({
  duration,
  questions,
}: {
  duration: number;
  questions: TriviaResponse;
}) {
  const router = useRouter();

  const quizTimeout = duration ?? 90;
  const timer = useRef<ReturnType<typeof setInterval>>(null);
  const [progress, setProgress] = useState(100);

  const [currentTimeLeft, setCurrentTimeLeft] = useLocalStorage<number>(
    "timer",
    quizTimeout,
  );
  const [currentQuestions, setCurrentQuestions] = useLocalStorage<
    Array<TriviaQuestion>
  >("questions", []);
  const [currentQuestionIndex, setCurrentQuestionIndex] =
    useLocalStorage<number>("questionIndex", 0);

  const mappedQuestions = useMemo(
    () =>
      currentQuestions.map((q) => ({
        question: q.question,
        answers: [q.correct_answer, ...q.incorrect_answers].sort(
          () => Math.random() - 0.5,
        ),
        status: 0,
      })),
    [currentQuestions],
  );

  // status -> 0: unanswered, 1: correct, 2: incorrect
  const currentQuestion = atob(
    mappedQuestions[currentQuestionIndex]?.question ?? "",
  );
  const currentAnswers = mappedQuestions[currentQuestionIndex]?.answers.map(
    (answer) => atob(answer),
  );
  const correctAnswer = atob(
    currentQuestions[currentQuestionIndex]?.correct_answer ?? "",
  );

  const unanswered = mappedQuestions
    .filter((q) => q.status === 0)
    .length.toString();
  const correct = mappedQuestions
    .filter((q) => q.status === 1)
    .length.toString();
  const incorrect = mappedQuestions
    .filter((q) => q.status === 2)
    .length.toString();

  const handleQuizTimeout = useCallback(() => {
    const params = new URLSearchParams({ unanswered, correct, incorrect });
    router.push(`/quiz/finish?${params.toString()}`);
  }, [unanswered, correct, incorrect, router]);

  const handleAnswerClick = (answer: string) => {
    const status =
      answer === atob(currentQuestions[currentQuestionIndex].correct_answer)
        ? 1
        : 2;

    mappedQuestions[currentQuestionIndex].status = status;

    if (currentQuestionIndex >= mappedQuestions.length - 1) {
      handleQuizTimeout();
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleSkipButton = () => {
    if (currentQuestionIndex >= mappedQuestions.length - 1) {
      handleQuizTimeout();
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const formatTime = (time: number) => {
    const seconds = `${Math.floor(time % 60)}`;
    const minutes = `${Math.floor((time / 60) % 60)}`;
    return `${minutes.padStart(2, "0")}:${seconds.padStart(2, "0")}`;
  };

  useEffect(() => {
    timer.current = setInterval(() => {
      setCurrentTimeLeft((prevTimer) => prevTimer - 1);
    }, 1000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [setCurrentTimeLeft]);

  useEffect(() => {
    if (currentTimeLeft <= 0 && timer.current) {
      clearInterval(timer.current);
      handleQuizTimeout();
    }
    setProgress(Math.floor((currentTimeLeft / quizTimeout) * 100));
  }, [currentTimeLeft, quizTimeout, handleQuizTimeout]);

  useEffect(() => {
    if (!questions.results) return;
    if (questions.results.length === 0) return;
    setCurrentQuestions((oldValue) => {
      if (oldValue && oldValue.length !== 0) return oldValue;
      return questions.results;
    });
  }, [questions.results, setCurrentQuestions]);

  return (
    <>
      <div className="absolute top-0 left-0! text-background text-2xl bg-foreground px-2">
        {formatTime(currentTimeLeft)}
      </div>
      <Progress className="absolute top-0 rounded-none" value={progress} />
      <Card className="w-full sm:w-2xl">
        <CardHeader>
          <CardTitle className="text-lg text-muted-foreground">
            Question {currentQuestionIndex + 1} of {mappedQuestions.length}
          </CardTitle>
          <CardDescription className="text-2xl text-foreground inline-block">
            {currentQuestion}{" "}
            <span className="text-background">{correctAnswer}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {currentAnswers &&
            currentAnswers.length > 0 &&
            currentAnswers.map((answer) => (
              <Button
                key={answer}
                onClick={() => handleAnswerClick(answer)}
                className="h-28 text-2xl"
              >
                {answer}
              </Button>
            ))}
        </CardContent>
        <CardFooter>
          <Button variant={"ghost"} onClick={handleSkipButton}>
            Skip
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
