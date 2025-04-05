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
    <div className="flex justify-center items-center mt-50">
      <Container></Container>
    </div>
  );
}
