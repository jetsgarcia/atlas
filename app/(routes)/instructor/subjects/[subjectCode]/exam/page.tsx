import ManageExam from "@/app/(routes)/instructor/subjects/[subjectCode]/exam/_components/manage-exam";

export default async function ExamPage({
  params,
}: {
  params: { subjectCode: string };
}) {
  return <ManageExam subjectCode={params.subjectCode} />;
}
