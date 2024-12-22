"use client";

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
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import CreateSubject from "@/actions/admin/create-subject";
import { toast } from "@/hooks/use-toast";

export default function SubjectsDialogButton({
  moduleId,
}: {
  moduleId: number;
}) {
  const [subjectName, setSubjectName] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSubmit() {
    setIsSubmitting(true);

    CreateSubject({
      moduleId: moduleId,
      subject: subjectName,
      subjectCode: subjectCode,
    }).then((response) => {
      setIsSubmitting(false);
      if (response.success) {
        setIsDialogOpen(false);
        toast({
          description: response.message,
        });

        // Reset form
        setSubjectName("");
        setSubjectCode("");
        setIsDialogOpen(false);
      } else {
        toast({
          variant: "destructive",
          description: response.message,
        });
      }
    });
  }

  return (
    <Dialog open={isDialogOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus />
          <span>Add</span>
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]"
        onInteractOutside={() => setIsDialogOpen(false)}
      >
        <DialogHeader>
          <Button
            onClick={() => setIsDialogOpen(false)}
            className="absolute top-0 right-0"
            variant="ghost"
          >
            <X />
          </Button>
          <DialogTitle>Create new Subject</DialogTitle>
          <DialogDescription>
            Input subject details here. Click submit when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              className="col-span-3"
              onChange={(e) => setSubjectName(e.target.value)}
              value={subjectName}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="code" className="text-right">
              Code
            </Label>
            <Input
              id="code"
              className="col-span-3"
              maxLength={5}
              onChange={(e) => setSubjectCode(e.target.value)}
              value={subjectCode}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}