export interface TriviaResponse {
  response_code: number;
  results: Array<TriviaQuestion>;
}

export interface TriviaQuestion {
  type: string;
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: Array<string>;
}
