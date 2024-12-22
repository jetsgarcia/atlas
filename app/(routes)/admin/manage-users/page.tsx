import { ReadAllUsers } from "@/actions/admin/read-user";
import { User, columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import PageTitle from "@/components/page-title";
import UsersDialogButton from "./_components/users-dialog-button";
import EmptyPlaceholder from "@/components/empty-placeholder";

async function getData(): Promise<User[]> {
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
  const data = await getData();

  return (
    <div className="py-5 max-w-[80rem] mx-10 xl:mx-auto">
      <div className="grid gap-4">
        <div className="flex justify-between items-center">
          <PageTitle title="Users Management" />
          <UsersDialogButton />
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
