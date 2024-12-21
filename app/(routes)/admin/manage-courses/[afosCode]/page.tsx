"use client";

import PageTitle from "@/components/page-title";
import ReadModules from "@/actions/admin/read-module";
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
import ModulesDialogButton from "./_components/modules-dialog-button";

interface Modules {
  module_id: number;
  module_number: number;
  module: string;
  afos_code: string;
}

export default function ManageModulesPage({
  params,
}: {
  params: { afosCode: string };
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [modules, setModules] = useState<Modules[]>([]);

  useEffect(() => {
    async function fetchModulesData() {
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
      } finally {
        setIsLoading(false);
      }
    }

    fetchModulesData();
  }, [params.afosCode]);

  return (
    <div className="py-5 max-w-[80rem] mx-10 xl:mx-auto">
      <div className="grid gap-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <Link
              href="/admin/manage-courses"
              className="transition-all ease-in-out hover:text-green-900"
            >
              <ChevronLeft />
            </Link>
            <PageTitle title={`Modules for ${params.afosCode}`} />
          </div>
          <ModulesDialogButton
            afosCode={params.afosCode}
            moduleLength={modules.length}
          />
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {modules.length === 0 ? (
              <EmptyPlaceholder />
            ) : (
              <div className="grid gap-2">
                <h3 className="text-lg font-semibold text-green-800">
                  Modules List
                </h3>
                <Table className="border">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[140px]">Module number</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead className="w-[40px]"></TableHead>
                      <TableHead className="w-[40px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {modules.map((record) => (
                      <TableRow key={record.module_id}>
                        <TableCell>
                          <Link
                            className="font-medium text-blue-600 underline"
                            href={`/admin/manage-courses/${record.afos_code}/${record.module_id}`}
                          >
                            Module {record.module_number}
                          </Link>
                        </TableCell>
                        <TableCell>{record.module}</TableCell>
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
