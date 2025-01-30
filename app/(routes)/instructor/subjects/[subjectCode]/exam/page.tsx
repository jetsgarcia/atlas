import { ReadSubjectCode } from "@/app/_features/instructor/manage-exam/actions/read-subject-code";
import ManageExam from "@/app/_features/instructor/manage-exam/components/manage-exam";
import { cookies } from "next/headers";

export default async function ExamPage({
  params,
}: {
  params: { afosCode: string };
}) {
  const cookieStore = cookies();
  const userId = Number(cookieStore.get("userId")?.value);

  const subjectCode = await ReadSubjectCode({ userId: userId });

  return (
    <ManageExam
      afosCode={params.afosCode}
      subjectCode={subjectCode.data ? subjectCode.data[0].subject_code : ""}
    />
  );
}
