"use client";

import { ReadInstructorSubjects } from "@/actions/db/read-subject";
import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Subjects {
  subject_code: string;
  subject: string;
  instructor: number;
  module_id: number;
}

export default function SubjectsList({ userId }: { userId: string }) {
  const [subjects, setSubjects] = useState<Subjects[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchInstructorSubjects() {
      try {
        if (userId) {
          const { success, data, message } = await ReadInstructorSubjects({
            instructorId: parseInt(userId, 10),
          });

          if (success) {
            setSubjects(data as Array<Subjects>);
          } else {
            console.log(message || "An error occurred");
          }
        }
      } catch (error: unknown) {
        console.log(
          error instanceof Error ? error.message : "An error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    }
    fetchInstructorSubjects();
  }, [userId]);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <Table className="border">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">Subject Code</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="w-[40px]"></TableHead>
              <TableHead className="w-[40px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subjects.map((record) => (
              <TableRow key={record.subject_code}>
                <TableCell>
                  <Link
                    className="font-medium text-blue-600 underline"
                    href={`/instructor/subjects/${record.subject_code}`}
                  >
                    {record.subject_code}
                  </Link>
                </TableCell>
                <TableCell>{record.subject}</TableCell>
                <TableCell>
                  <Button variant="ghost">
                    <Pencil size={16} />
                  </Button>
                </TableCell>
                <TableCell>
                  <Button variant="ghost">
                    <Trash size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
