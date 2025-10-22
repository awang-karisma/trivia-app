import { Suspense } from "react";
import FinishPage from "./finish-page";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const params = new URLSearchParams(await searchParams);
  const unanswered = Number.parseInt(params.get("unanswered") ?? "0", 10);
  const correct = Number.parseInt(params.get("correct") ?? "0", 10);
  const incorrect = Number.parseInt(params.get("incorrect") ?? "0", 10);
  return (
    <Suspense fallback={<>...</>}>
      <FinishPage
        unanswered={unanswered}
        correct={correct}
        incorrect={incorrect}
      />
    </Suspense>
  );
}
