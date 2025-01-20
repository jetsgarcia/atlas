import ManageExam from "@/app/_features/instructor/manage-videos/manage-exam";

export default function ExamPage({
  params,
}: {
  params: { subjectCode: string };
}) {
  return <ManageExam params={{ subjectCode: params.subjectCode }} />;
}
