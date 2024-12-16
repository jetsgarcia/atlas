import PageTitle from "@/components/admin/page-title";
import ModulesAndSubjectsDialogButton from "./_components/modules-and-subjects-dialog-button";

export default function ManageModulesAndSubjectsPage({
  params,
}: {
  params: { afosCode: string };
}) {
  return (
    <div className="pt-10 max-w-[80rem] m-auto">
      <div className="flex justify-between items-center">
        <PageTitle
          title={`Manage Modules and Subjects for ${params.afosCode}`}
        />
        <ModulesAndSubjectsDialogButton />
      </div>
    </div>
  );
}
