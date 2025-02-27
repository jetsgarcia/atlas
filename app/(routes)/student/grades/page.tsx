import GradeList from "./_components/grades-list";
import { cookies } from "next/headers";

export default async function GradesPage() {
  const cookieStore = cookies();
  const userId = cookieStore.get("userId")?.value?.toString() || "";

  return (
    <div className="p-4 border rounded-lg">
      <GradeList userId={userId} />
    </div>
  );
}
