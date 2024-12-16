import AFOSDialogButton from "./_components/afos-dialog-button";

export default function ManageCoursesPage() {
  return (
    <div className="pt-10 max-w-[80rem] m-auto">
      <div className="flex justify-between items-center"> 
        <h1 className="text-xl font-semibold">
          AFOS &#40;Armed Forces Occupational Specialty&#41;
        </h1>
        <AFOSDialogButton />
      </div>
    </div>
  );
}
