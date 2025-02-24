"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import UpdateSubject from "../_actions/update-subject";
import { toast } from "@/hooks/use-toast";

export default function EditSubjectButton({
  subjectCode,
  subjectName,
  instructor,
}: {
  subjectCode: string;
  subjectName: string;
  instructor: number;
}) {
  const [subjectNameInput, setSubjectNameInput] = useState("");
  const [instructorInput, setInstructorInput] = useState<number>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSubmit() {
    setIsSubmitting(true);
    UpdateSubject({
      subjectCode: subjectCode,
      subject: subjectNameInput,
      instructor: Number(instructorInput),
    }).then((result) => {
      if (result.success) {
        setIsDialogOpen(false);
        toast({
          description: result.message,
        });
      } else {
        toast({
          variant: "destructive",
          description: result.message,
        });
      }
    });
  }

  useEffect(() => {
    setSubjectNameInput(subjectName);
    setInstructorInput(instructor);
  }, [subjectCode, subjectName, instructor]);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsDialogOpen(true);
          }}
        >
          Edit
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
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
            <Label htmlFor="instructor" className="text-right">
              Instructor
            </Label>
            <Input
              id="instructor"
              className="col-span-3"
              maxLength={6}
              onChange={(e) => setInstructorInput(Number(e.target.value))}
              value={instructorInput}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Subj Name
            </Label>
            <Input
              id="name"
              className="col-span-3"
              onChange={(e) => setSubjectNameInput(e.target.value)}
              value={subjectNameInput}
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
