"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Save } from "lucide-react";
import { useState } from "react";

export default function ManageExam({
  params,
}: {
  params: { subjectCode: string };
}) {
  const [examEditor, setExamEditor] = useState(false);
  const [openAddQuestion, setOpenAddQuestion] = useState(false);

  return examEditor ? (
    <div>
      <div className="flex justify-between items-center">
        <h2>Exam for {params.subjectCode}</h2>
        <div className="flex gap-4 items-center">
          <Button
            onClick={() => {
              setExamEditor(false);
            }}
            variant="ghost"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              setExamEditor(false);
            }}
          >
            <Save />
            Save
          </Button>
        </div>
      </div>
      <div className="mt-4">
        {openAddQuestion ? (
          <div className="border p-4 rounded">
            <div className="flex gap-4 items-center">
              <Label htmlFor="question">Question:</Label>
              <Input id="question" name="question" type="text" required />
            </div>
            <div className="ml-14 w-1/2 mt-4 grid gap-4">
              <div className="flex gap-4 items-center">
                <Label htmlFor="a">a:</Label>
                <Input id="a" name="a" type="text" required />
              </div>
              <div className="flex gap-4 items-center">
                <Label htmlFor="b">b:</Label>
                <Input id="b" name="b" type="text" required />
              </div>
              <div className="flex gap-4 items-center">
                <Label htmlFor="c">c:</Label>
                <Input id="c" name="c" type="text" required />
              </div>
            </div>
          </div>
        ) : (
          <Button
            onClick={() => {
              setOpenAddQuestion(true);
            }}
            variant="ghost"
            className="w-full py-10"
          >
            <Plus />
            Add question
          </Button>
        )}
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center h-[35rem] gap-4">
      <h2 className="text-lg">No exam created yet</h2>
      <Button
        onClick={() => {
          setExamEditor(true);
        }}
      >
        Create exam
      </Button>
    </div>
  );
}
