import { ReadAllAFOS } from "@/actions/db/read-afos";
import Link from "next/link";

// Components
import PageTitle from "@/components/page-title";
import AFOSDialogButton from "@/features/admin/manage-courses/components/afos-dialog-button";
import EmptyPlaceholder from "@/components/empty-placeholder";
import { Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface AFOS {
  afos_code: string;
  afos: string;
  level: string;
}

async function getAllAFOS(): Promise<AFOS[]> {
  try {
    const { success, data, message } = await ReadAllAFOS();
    if (success) {
      return data as Array<AFOS>;
    } else {
      console.log(message || "An error occurred");
      return [];
    }
  } catch (error: unknown) {
    console.log(error instanceof Error ? error.message : "An error occurred");
    return [];
  }
}

export default async function ManageCoursesPage() {
  const data = await getAllAFOS();

  return (
    <div className="2xl:py-5 max-w-[80rem] mx-10 xl:mx-auto">
      <div className="grid gap-4">
        <div className="flex justify-between items-center">
          <PageTitle title="AFOS Management" />
          <AFOSDialogButton />
        </div>
        {data.length === 0 ? (
          <EmptyPlaceholder />
        ) : (
          <div className="grid gap-2">
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
                {data.map((record) => (
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
      </div>
    </div>
  );
}
