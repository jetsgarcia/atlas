import Link from "next/link";

// Components
import { ChevronLeft } from "lucide-react";

export default async function Layout({
  params,
  children,
}: {
  params: { subjectCode: string };
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-10 mb-4">
        <div className="flex items-center gap-4">
          <Link href="/instructor/subjects">
            <ChevronLeft />
          </Link>
          <h2 className="text-2xl font-semibold">{params.subjectCode}</h2>
        </div>
        <div className="flex gap-6">
          <Link
            href={`/instructor/subjects/${params.subjectCode}/videos`}
            className="font-normal"
          >
            Videos
          </Link>
          <Link
            href={`/instructor/subjects/${params.subjectCode}/exam`}
            className="font-normal"
          >
            Exam
          </Link>
          <Link
            href={`/instructor/subjects/${params.subjectCode}/grades`}
            className="font-normal"
          >
            Grades
          </Link>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}
