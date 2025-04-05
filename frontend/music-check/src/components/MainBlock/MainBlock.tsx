import { useState } from "react";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const MainBlock = () => {
  const [musicLink, setMusicLink] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMusicLink(event.target.value);
  };

  return (
    <Card className="w-[900px] overflow-hidden">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent className="overflow-auto">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Get Started!</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] overflow-hidden">
            <DialogHeader>
              <DialogTitle className="pb-5">Enter Your Music URL</DialogTitle>
              <DialogDescription>
                Add the link to your music track here. Once you've entered the
                URL, click 'Submit' to analyze its suitability for studying.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Music Link
                </Label>
                <Input
                  id="name"
                  value={musicLink}
                  className="col-span-3"
                  onChange={handleChange}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Test the Vibes!</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};
export default MainBlock;
