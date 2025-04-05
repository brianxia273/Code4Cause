import "./main.css";

import Image from "next/image";

import { CardWithForm } from "@/components/layout/Welcome";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <div className="bg-gradient-to-r from-black-400 to-purple-300">
      <CardWithForm></CardWithForm>
    </div>
  );
}
