import type { TriviaQuestion } from "./OpenTDB";

export interface Session {
  isLoggedIn?: boolean;
  email?: string;
  questions?: Array<TriviaQuestion>;
  questionIndex?: number;
}
