import PageTitle from "@/components/admin/page-title";
import AFOSDialogButton from "./_components/afos-dialog-button";

export default function ManageCoursesPage() {
  return (
    <div className="pt-10 max-w-[80rem] m-auto">
      <div className="flex justify-between items-center">
        <PageTitle title="AFOS &#40;Armed Forces Occupational Specialty&#41;" />
        <AFOSDialogButton />
      </div>
    </div>
  );
}
