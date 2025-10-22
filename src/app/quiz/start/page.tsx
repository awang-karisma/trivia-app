"use client";
import { useEffect, useRef, useState } from "react";
import QuestionBox from "@/components/quiz/question-box";
import { Progress } from "@/components/ui/progress";

export default function QuizStart() {
  const quizTimeout = 60; // TODO: make this configurable
  const timer = useRef<ReturnType<typeof setInterval>>(null);
  const [currentTimeLeft, setCurrentTimeLeft] = useState(quizTimeout);
  const [progress, setProgress] = useState(100);

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
    if (currentTimeLeft <= 0 && timer.current) clearInterval(timer.current);
    setProgress(Math.floor((currentTimeLeft / quizTimeout) * 100));
  }, [currentTimeLeft]);

  return (
    <>
      <div className="absolute top-0 left-0! text-background text-2xl bg-foreground px-2">
        {formatTime(currentTimeLeft)}
      </div>
      <Progress className="absolute top-0 rounded-none" value={progress} />
      <QuestionBox />
    </>
  );
}
