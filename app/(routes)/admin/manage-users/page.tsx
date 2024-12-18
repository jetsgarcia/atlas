import PageTitle from "@/components/admin/page-title";

export default function ManageUsersPage() {
  return (
    <div className="py-10 max-w-[80rem] mx-10 xl:mx-auto">
      <div className="grid gap-4">
        <div className="flex justify-between items-center">
          <PageTitle title="Users Management" />
        </div>
      </div>
    </div>
  );
}
