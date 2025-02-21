"use client";

import { ReadStudentGrades } from "@/app/_features/student/grades/actions/read-grades";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";

type Score = {
  written_score: number;
  score_id: number;
  score: number;
  student_serial: number;
  subject: string;
  written_exam?: number;
};

export default function GradeList({ userId }: { userId: string }) {
  const [groupedScores, setGroupedScores] = useState<Record<string, Score[]>>(
    {}
  );

  useEffect(() => {
    ReadStudentGrades({ userId }).then((response) => {
      const scores: Score[] = (response.data ?? []) as Score[];
      if (scores.length === 0) return;

      const grouped: Record<string, Score[]> = {};
      scores.forEach((score) => {
        if (!grouped[score.subject]) {
          grouped[score.subject] = [];
        }
        grouped[score.subject].push(score);
      });

      setGroupedScores(grouped);
    });
  }, [userId]);

  if (Object.keys(groupedScores).length === 0) {
    return <div>No grades available.</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Subject</TableHead>
          <TableHead>Written Score</TableHead>
          <TableHead>Practical Score</TableHead>
          <TableHead>Subject Grade</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Object.entries(groupedScores).map(([subject, scores]) => {
          const writtenScore = scores[0].written_score;
          const practicalScore = scores[0].score;

          // Calculate total based on practical score being zero or not
          const totalScore =
            practicalScore > 0
              ? (writtenScore / 100) * 40 + (practicalScore / 100) * 60
              : writtenScore;

          return (
            <TableRow key={subject}>
              <TableCell className="font-bold">{subject}</TableCell>
              <TableCell>{writtenScore}</TableCell>
              <TableCell>{practicalScore}</TableCell>
              <TableCell>{totalScore.toFixed(0)}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
