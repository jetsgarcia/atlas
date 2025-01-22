"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// Components
import { Button } from "@/components/ui/button";
import EmptyPlaceholder from "@/components/empty-placeholder";
import StudentCard from "./student-card";

export default function ManageExam({
  params,
}: {
  params: { subjectCode: string };
}) {
  const [answers, setAnswers] = useState(false);
  const [exam, setExam] = useState(false);

  useEffect(() => {
    // Fetch data here
    setAnswers(true);
    setExam(false);
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-lg">List of answers of students</h2>
        {exam ? (
          <Link href={`/instructor/subjects/${params.subjectCode}/exam/view`}>
            <Button>View exam</Button>
          </Link>
        ) : (
          <Link href={`/instructor/subjects/${params.subjectCode}/exam/create`}>
            <Button>Create exam</Button>
          </Link>
        )}
      </div>
      {answers ? (
        <div className="py-6 grid gap-4">
          <StudentCard name="John Doe" score={87} />
          <StudentCard name="Abigail Garcia" score={99} />
        </div>
      ) : (
        <EmptyPlaceholder />
      )}
    </div>
  );
}
