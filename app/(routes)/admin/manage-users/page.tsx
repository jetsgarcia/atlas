import { ReadAllUsers } from "@/actions/read-user";
import PageTitle from "@/components/page-title";
import AddUsersButton from "@/app/(routes)/admin/manage-users/_components/add-users-button";
import EmptyPlaceholder from "@/components/empty-placeholder";
import { DataTable } from "@/app/(routes)/admin/manage-users/_components/data-table";
import {
  User,
  columns,
} from "@/app/(routes)/admin/manage-users/_components/columns";

async function getAllUsers(): Promise<User[]> {
  try {
    const { success, data, message } = await ReadAllUsers();
    if (success) {
      return data as Array<User>;
    } else {
      console.log(message || "An error occurred");
      return [];
    }
  } catch (error: unknown) {
    console.log(error instanceof Error ? error.message : "An error occurred");
    return [];
  }
}

export default async function ManageUsersPage() {
  const data = await getAllUsers();

  return (
    <div className="max-w-[80rem] mx-10 xl:mx-auto">
      <div className="grid gap-4">
        <div className="flex justify-between items-center">
          <PageTitle title="Users Management" />
          <AddUsersButton />
        </div>
        {data.length === 0 ? (
          <div className="w-full">
            <EmptyPlaceholder />
          </div>
        ) : (
          <DataTable columns={columns} data={data} />
        )}
      </div>
    </div>
  );
}
