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
            className="relative px-4 py-2 text-gray-700 transition duration-300 ease-in-out 
             before:absolute before:inset-x-0 before:bottom-0 before:h-0.5 
             before:bg-darkGreen-600 before:scale-x-0 before:transition-transform 
             before:duration-300 hover:text-darkGreen-600 hover:before:scale-x-100 
             active:scale-95"
          >
            Videos
          </Link>
          <Link
            href={`/instructor/subjects/${params.subjectCode}/exam`}
            className="relative px-4 py-2 text-gray-700 transition duration-300 ease-in-out 
             before:absolute before:inset-x-0 before:bottom-0 before:h-0.5 
             before:bg-darkGreen-600 before:scale-x-0 before:transition-transform 
             before:duration-300 hover:text-darkGreen-600 hover:before:scale-x-100 
             active:scale-95"
          >
            Exam
          </Link>
          <Link
            href={`/instructor/subjects/${params.subjectCode}/grades`}
            className="relative px-4 py-2 text-gray-700 transition duration-300 ease-in-out 
             before:absolute before:inset-x-0 before:bottom-0 before:h-0.5 
             before:bg-darkGreen-600 before:scale-x-0 before:transition-transform 
             before:duration-300 hover:text-darkGreen-600 hover:before:scale-x-100 
             active:scale-95"
          >
            Grades
          </Link>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}
