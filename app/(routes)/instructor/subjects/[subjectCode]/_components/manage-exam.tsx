"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Save } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ManageExam({
  params,
}: {
  params: { subjectCode: string };
}) {
  const [examEditor, setExamEditor] = useState(false);
  const [openAddQuestion, setOpenAddQuestion] = useState(false);
  const [date, setDate] = useState<Date>();
  const [selectedHour, setSelectedHour] = useState("");

  const hours = Array.from(
    { length: 24 },
    (_, i) => `${i.toString().padStart(2, "0")}:00`
  );

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
            Go back
          </Button>
          <Button
            onClick={() => {
              setExamEditor(false);
              console.log(selectedHour);
            }}
          >
            <Save />
            Save
          </Button>
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[240px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <div
          className={selectedHour ? "w-48 text-black" : "w-48 text-gray-500"}
        >
          <Select value={selectedHour} onValueChange={setSelectedHour}>
            <SelectTrigger>
              <SelectValue placeholder="Pick a time" />
            </SelectTrigger>
            <SelectContent>
              {hours.map((hour) => (
                <SelectItem key={hour} value={hour}>
                  {hour}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
            <div className="flex justify-end gap-4 items-center mt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setOpenAddQuestion(false);
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  setOpenAddQuestion(false);
                }}
              >
                Add question
              </Button>
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
