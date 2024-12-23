"use client";

import PageTitle from "@/components/page-title";
import AFOSDialogButton from "./_components/afos-dialog-button";
import { useEffect, useState } from "react";
import ReadAllAFOS from "@/actions/admin/read-afos";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import Loader from "@/components/loader";
import EmptyPlaceholder from "@/components/empty-placeholder";

interface AFOS {
  afos_code: string;
  afos: string;
  level: string;
}

export default function ManageCoursesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [afos, setAFOS] = useState<AFOS[]>([]);

  useEffect(() => {
    async function fetchModulesData() {
      try {
        const { success, data, message } = await ReadAllAFOS();
        if (success) {
          setAFOS(data as Array<AFOS>);
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
    fetchModulesData();
  }, []);

  return (
    <div className="py-5 max-w-[80rem] mx-10 xl:mx-auto">
      <div className="grid gap-4">
        <div className="flex justify-between items-center">
          <PageTitle title="Courses Management" />
          <AFOSDialogButton />
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {afos.length === 0 ? (
              <EmptyPlaceholder />
            ) : (
              <div className="grid gap-2">
                <h3 className="text-lg font-semibold text-green-800">
                  AFOS &#40;Armed Forces Occupational Specialty&#41; List
                </h3>
                <Table className="border">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[120px]">Code</TableHead>
                      <TableHead className="w-[140px]">Level</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead className="w-[40px]"></TableHead>
                      <TableHead className="w-[40px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {afos.map((record) => (
                      <TableRow key={record.afos_code}>
                        <TableCell>
                          <Link
                            className="font-medium text-blue-600 underline"
                            href={`/admin/manage-courses/${record.afos_code}`}
                          >
                            {record.afos_code}
                          </Link>
                        </TableCell>
                        <TableCell>{record.level}</TableCell>
                        <TableCell>{record.afos}</TableCell>
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
