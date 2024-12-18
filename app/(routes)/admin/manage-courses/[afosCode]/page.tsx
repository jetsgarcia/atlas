"use client";

import PageTitle from "@/components/admin/page-title";
import ModulesAndSubjectsDialogButton from "./_components/modules-and-subjects-dialog-button";
import ReadModules from "@/actions/admin/read-module";
import ReadSubjects from "@/actions/admin/read-subject";
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
import Loader from "@/components/admin/loader";
import EmptyPlaceholder from "@/components/admin/empty-placeholder";
import Link from "next/link";

interface Modules {
  module_id: number;
  module_number: number;
  module: string;
  afos_code: string;
}

interface Subjects {
  subject_code: string;
  subject: string;
  module_id: number;
}

export default function ManageModulesAndSubjectsPage({
  params,
}: {
  params: { afosCode: string };
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [modules, setModules] = useState<Modules[]>([]);
  const [subjects, setSubjects] = useState<Subjects[]>([]);

  useEffect(() => {
    async function getModulesData() {
      try {
        const { success, data, message } = await ReadModules({
          afos_code: params.afosCode,
        });
        if (success) {
          setModules(data as Array<Modules>);
        } else {
          console.log(message || "An error occurred");
        }
      } catch (error: unknown) {
        console.log(
          error instanceof Error ? error.message : "An error occurred"
        );
      }
    }

    getModulesData();
  }, [params.afosCode]);

  useEffect(() => {
    async function getSubjectsData() {
      try {
        const promises = modules.map(async (module) => {
          try {
            const { success, data, message } = await ReadSubjects({
              module_id: module.module_id,
            });
            if (success) {
              return data as Array<Subjects>;
            } else {
              console.log(message || "An error occurred");
              return null;
            }
          } catch (error: unknown) {
            console.log(
              error instanceof Error ? error.message : "An error occurred"
            );
            return null;
          }
        });

        const results = await Promise.all(promises);
        const subjects = results.flat().filter((item) => item !== null);
        setSubjects(subjects);
      } catch (error: unknown) {
        console.log(
          error instanceof Error ? error.message : "An error occurred"
        );
      }
    }

    getSubjectsData();
  }, [modules]);

  useEffect(() => {
    if (modules.length > 0 && subjects.length > 0) {
      setIsLoading(false);
    }
  }, [modules.length, subjects.length]);

  return (
    <div className="py-10 max-w-[80rem] mx-10 xl:mx-auto">
      <div className="grid gap-6">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <Link
              href="/admin/manage-courses"
              className="transition-all ease-in-out hover:text-green-900"
            >
              <ChevronLeft />
            </Link>
            <PageTitle title={`Modules and Subjects for ${params.afosCode}`} />
          </div>
          <ModulesAndSubjectsDialogButton />
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {modules.length === 0 ? (
              <EmptyPlaceholder />
            ) : (
              <>
                {modules.map((module: Modules) => (
                  <div key={module.module_number} className="grid gap-2">
                    <h3 className="text-lg font-semibold text-green-800">
                      Module {module.module_number}: {module.module}
                    </h3>
                    <Table className="border">
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[160px]">
                            Subject Code
                          </TableHead>
                          <TableHead>Subject Name</TableHead>
                          <TableHead className="w-[40px]"></TableHead>
                          <TableHead className="w-[40px]"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {subjects
                          .filter(
                            (subject) => subject.module_id === module.module_id
                          ) // Filter subjects for the current module
                          .map((subject) => {
                            const key = `${module.module_id}-${subject.subject_code}`; // Generate a unique key
                            return (
                              <TableRow key={key}>
                                <TableCell>{subject.subject_code}</TableCell>
                                <TableCell>{subject.subject}</TableCell>
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
                            );
                          })}
                      </TableBody>
                    </Table>
                  </div>
                ))}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
