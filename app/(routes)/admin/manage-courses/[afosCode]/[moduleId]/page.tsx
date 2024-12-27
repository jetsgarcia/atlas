"use client";

import PageTitle from "@/components/page-title";
import { ReadSubjects } from "@/actions/db/read-subject";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Pencil, Trash } from "lucide-react";
import Loader from "@/components/loader";
import EmptyPlaceholder from "@/components/empty-placeholder";
import Link from "next/link";
import SubjectsDialogButton from "./_components/subjects-dialog-button";

interface Subjects {
  subject_code: string;
  subject: string;
  instructor: number;
  module_id: number;
}

export default function ManageSubjectsPage({
  params,
}: {
  params: { moduleId: number; afosCode: string };
}) {
  const [subjects, setSubjects] = useState<Subjects[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchSubjectsData() {
      try {
        const { success, data, message } = await ReadSubjects({
          module_id: params.moduleId,
        });
        if (success) {
          setSubjects(data as Array<Subjects>);
        } else {
          console.log(message || "An error occurred");
        }
      } catch (error: unknown) {
        console.log(
          error instanceof Error ? error.message : "An error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchSubjectsData();
  }, [params.moduleId]);

  return (
    <div className="py-5 max-w-[80rem] mx-10 xl:mx-auto">
      <div className="grid gap-6">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <Link
              href={`/admin/manage-courses/${params.afosCode}`}
              className="transition-all ease-in-out hover:text-green-900"
            >
              <ChevronLeft />
            </Link>
            <PageTitle title={`Subjects`} />
          </div>
          <SubjectsDialogButton moduleId={params.moduleId} />
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {subjects.length === 0 ? (
              <EmptyPlaceholder />
            ) : (
              <div className="grid gap-2">
                <h3 className="text-lg font-semibold text-green-800">
                  Subjects List
                </h3>
                <Table className="border">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[140px]">Subject code</TableHead>
                      <TableHead className="w-[140px]">Instructor ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead className="w-[40px]"></TableHead>
                      <TableHead className="w-[40px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {subjects.map((record) => (
                      <TableRow key={record.subject_code}>
                        <TableCell>{record.subject_code}</TableCell>
                        <TableCell className="underline">
                          <Link
                            className="font-medium text-blue-600 underline"
                            href={`/admin/manage-users/${record.instructor}`}
                          >
                            {record.instructor}
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
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
