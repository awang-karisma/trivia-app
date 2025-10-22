import QuestionSetup from "@/components/quiz/question-setup";

export default async function QuizIndex() {
  "use server";
  const data = await fetch("https://opentdb.com/api_category.php", {
    cache: "force-cache",
  });
  const categories = await data.json();
  return <QuestionSetup categories={categories} />;
}
