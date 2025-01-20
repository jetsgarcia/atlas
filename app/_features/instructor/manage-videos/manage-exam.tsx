"use client";

import { useState } from "react";
import Link from "next/link";

// Components
import { Button } from "@/components/ui/button";
import EmptyPlaceholder from "@/components/empty-placeholder";

export default function ManageExam({
  params,
}: {
  params: { subjectCode: string };
}) {
  const [answers, setAnswers] = useState(false);
  const [exam, setExam] = useState(false);

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
      {answers ? <div>Answers</div> : <EmptyPlaceholder />}
    </div>
  );
}
