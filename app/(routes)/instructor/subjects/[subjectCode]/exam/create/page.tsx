import CreateExam from "@/app/(routes)/instructor/subjects/[subjectCode]/exam/_components/create-exam";

export default function CreateExamPage({
  params,
}: {
  params: { subjectCode: string };
}) {
  return <CreateExam params={{ subjectCode: params.subjectCode }} />;
}
