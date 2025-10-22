"use client";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Progress } from "@/components/ui/progress";
import type { TriviaResponse } from "@/types/OpenTDB";
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
  const [currentTimeLeft, setCurrentTimeLeft] = useState(quizTimeout);
  const [progress, setProgress] = useState(100);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const mappedQuestions = questions.results.map((q) => ({
    question: q.question,
    answers: [q.correct_answer, ...q.incorrect_answers].sort(
      () => Math.random() - 0.5,
    ),
    status: 0,
  }));
  const mappedQuestionsRef = useRef(mappedQuestions);
  // status -> 0: unanswered, 1: correct, 2: incorrect
  const currentQuestion = atob(
    mappedQuestionsRef.current[currentQuestionIndex].question,
  );
  const currentAnswers = mappedQuestionsRef.current[
    currentQuestionIndex
  ].answers.map((answer) => atob(answer));
  const correctAnswer = questions.results[currentQuestionIndex].correct_answer;

  const unanswered = mappedQuestionsRef.current
    .filter((q) => q.status === 0)
    .length.toString();
  const correct = mappedQuestionsRef.current
    .filter((q) => q.status === 1)
    .length.toString();
  const incorrect = mappedQuestionsRef.current
    .filter((q) => q.status === 2)
    .length.toString();

  const handleQuizTimeout = useCallback(() => {
    const params = new URLSearchParams({ unanswered, correct, incorrect });
    router.push(`/quiz/finish?${params.toString()}`);
  }, [unanswered, correct, incorrect, router]);

  const handleAnswerClick = (answer: string) => {
    const status =
      answer === atob(questions.results[currentQuestionIndex].correct_answer)
        ? 1
        : 2;

    mappedQuestionsRef.current[currentQuestionIndex].status = status;

    if (currentQuestionIndex >= mappedQuestionsRef.current.length - 1) {
      handleQuizTimeout();
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleSkipButton = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
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
  }, []);

  useEffect(() => {
    if (currentTimeLeft <= 0 && timer.current) {
      clearInterval(timer.current);
      handleQuizTimeout();
    }
    setProgress(Math.floor((currentTimeLeft / quizTimeout) * 100));
  }, [currentTimeLeft, quizTimeout, handleQuizTimeout]);

  return (
    <>
      <div className="absolute top-0 left-0! text-background text-2xl bg-foreground px-2">
        {formatTime(currentTimeLeft)}
      </div>
      <Progress className="absolute top-0 rounded-none" value={progress} />
      {mappedQuestionsRef.current.length > 0 ? (
        <Card className="w-full sm:w-2xl">
          <CardHeader>
            <CardTitle className="text-lg text-muted-foreground">
              Question {currentQuestionIndex + 1} of{" "}
              {mappedQuestionsRef.current.length}
            </CardTitle>
            <CardDescription className="text-2xl text-foreground inline-block">
              {currentQuestion}{" "}
              <span className="text-background">{atob(correctAnswer)}</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {currentAnswers.map((answer) => (
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
      ) : (
        <div>Loading questions...</div>
      )}
    </>
  );
}
