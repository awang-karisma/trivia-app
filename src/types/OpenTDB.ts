export interface TriviaResponse {
  response_code: number;
  results: Array<{
    type: string;
    difficulty: string;
    category: string;
    question: string;
    correct_answer: string;
    incorrect_answers: Array<string>;
  }>;
}
