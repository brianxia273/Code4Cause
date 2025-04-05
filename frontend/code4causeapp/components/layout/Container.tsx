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
    <Card className="w-80 h-full flex flex-col justify-center items-center p-8 bg-gradient-to-r from-blue-300 via-teal-400 to-purple-500 rounded-lg shadow-lg transform hover:scale-105 hover:shadow-2xl transition-all ease-in-out duration-300 font-sans rounded-md">
      <CardHeader className="w-full text-center">
        <CardTitle className="text-3xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-teal-600 to-purple-700 pb-6 hover:text-teal-500 transition-all ease-in-out duration-300">
          StudyBeats
        </CardTitle>
        <CardDescription className="text-gray-700 text-lg">
          Is this track helping you stay focused? Rate the music to see if it
          enhances your study sessions.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col justify-center items-center space-y-4">
        <MusicInput />
      </CardContent>
      <CardFooter className="text-center text-gray-600">
        <Instructions />
      </CardFooter>
    </Card>
  );
}
