import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MainBlock from "@/components/MainBlock/MainBlock";

function App() {
  return (
    <div className="flex items-center justify-center min-h-screen overflow-hidden">
      <MainBlock />
    </div>
  );
}

export default App;
