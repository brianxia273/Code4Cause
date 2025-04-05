import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MusicInput } from "@/components/layout/MusicInput";
import { Instructions } from "@/components/layout/Instructions";

export function Container() {
  return (
    <Card className="w-200 h-full flex flex-col justify-center items-center p-6">
      <CardHeader className="w-full text-center">
        <CardTitle className="text-2xl pb-6">StudyBeats</CardTitle>
        <CardDescription className="text-center">
          Is this track helping you stay focused? Rate the music to see if it
          enhances your study sessions.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col justify-center items-center">
        <MusicInput />
      </CardContent>
      <CardFooter className="text-center">
        <Instructions />
      </CardFooter>
    </Card>
  );
}
