"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation"; // Use next/navigation instead of next/router

export function CardWithForm() {
  // State to store the selected option
  const [selectedOption, setSelectedOption] = React.useState<string>("");

  const router = useRouter(); // Initialize useRouter hook from next/navigation

  // Array of quotes
  const quotes = [
    "The only way to achieve the impossible is to believe it is possible. - Unknown",
    "Act as if what you do makes a difference. It does. - William James",
    "Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill",
    // ... (other quotes)
  ];

  // Function to get a random quote
  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  };

  // Handle selection change in dropdown
  const handleSelectionChange = (value: string) => {
    setSelectedOption(value); // Update the selected option

    // Navigate to the 'music' page if the 'relaxation' option is selected
    if (value === "relaxation") {
      router.push("/music"); // Navigate to the 'music.tsx' page
    }
  };

  return (
    <>
      {/* Header Section */}
      <header className="bg-gradient-to-r from-purple via-black-400 to-purple-300">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo / Title Section */}
          <div className="flex items-center space-x-4">
            <div className="text-white font-bold text-2xl">StudySession</div>
          </div>

          {/* Navigation Links */}
          <nav>
            <ul className="flex space-x-6">
              <li className="text-white">Home</li>
              <li className="text-white">About</li>
              <li className="text-white">Contact</li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Quote Section */}
      <div className="quote-section text-center text-white font-semibold text-xl bg-gradient-to-r from black-400 to-purple-300 p-4">
        <p>{getRandomQuote()}</p>
      </div>

      {/* Main Content Section */}
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-black-400 to-purple-300">
        <Card className="card-large animate-card-entry bg-white p-6 rounded-lg shadow-xl">
          {/* Header Section */}
          <CardHeader className="text-center mt-16">
            <CardTitle className="text-3xl font-bold text-gray-800">
              Welcome to the all-in-one <strong>StudySession</strong>!
            </CardTitle>
            <CardDescription className="text-lg text-gray-600">
              Access various study options to help you focus and relax!
            </CardDescription>
          </CardHeader>

          {/* Content Section */}
          <CardContent className="card-content">
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  {/* Form Label */}
                  <Label className="text-xl font-semibold text-gray-800">
                    Please choose an option
                  </Label>

                  {/* Dropdown Menu */}
                  <div className="select-wrapper">
                    <Select onValueChange={handleSelectionChange}>
                      <SelectTrigger id="framework">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="studyMaterials">
                          Study materials
                        </SelectItem>
                        <SelectItem value="focus">Focus</SelectItem>
                        <SelectItem value="relaxation">Relaxation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </form>
          </CardContent>

          {/* Footer Section */}
          <CardFooter className="flex justify-between">
            <Button variant="outline" className="cursor-pointer">
              Cancel
            </Button>
            <Button className="cursor-pointer">Deploy</Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
