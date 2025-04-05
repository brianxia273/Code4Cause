import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Container } from "@/components/layout/Container";
import { Instructions } from "@/components/layout/Instructions";

export function MainContainer() {
  return (
    <div className="flex justify-center items-center bg-gradient-to-r from-pink-200 via-peach-200 to-lime-200 min-h-screen">
      <Container />
    </div>
  );
}
