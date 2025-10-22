import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function QuestionBox() {
  return (
    <Card className="w-full sm:w-2xl">
      <CardHeader>
        <CardTitle className="text-lg text-muted-foreground">
          Question 1 of 30
        </CardTitle>
        <CardDescription className="text-2xl text-foreground">
          Question here
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <Button className="h-28 text-2xl">Option 1</Button>
        <Button className="h-28 text-2xl">Option 2</Button>
        <Button className="h-28 text-2xl">Option 3</Button>
        <Button className="h-28 text-2xl">Option 4</Button>
      </CardContent>
    </Card>
  );
}
