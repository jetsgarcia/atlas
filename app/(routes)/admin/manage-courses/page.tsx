import { ReadAllAFOS } from "@/actions/db/read-afos";
import {
  AFOS,
  columns,
} from "@/features/admin/manage-courses/components/columns";

// Components
import PageTitle from "@/components/page-title";
import AFOSDialogButton from "@/features/admin/manage-courses/components/afos-dialog-button";
import EmptyPlaceholder from "@/components/empty-placeholder";
import { DataTable } from "@/features/admin/manage-courses/components/data-table";

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
          <DataTable columns={columns} data={data} />
        )}
      </div>
    </div>
  );
}
