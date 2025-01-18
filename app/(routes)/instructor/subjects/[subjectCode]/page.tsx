"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import Link from "next/link";

// Components
import PageTitle from "@/components/page-title";
import AddVideoButton from "@/app/_features/instructor/manage-videos/add-video-button";
import SubjectVideos from "@/app/_features/instructor/manage-videos/subject-videos";
import ManageExam from "@/app/_features/instructor/manage-videos/manage-exam";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export default function ManageCourseMaterialsPage({
  params,
}: {
  params: { subjectCode: string };
}) {
  const [page, setPage] = useState(1);

  return (
    <div>
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-4">
          <Link href="/instructor/subjects">
            <ChevronLeft />
          </Link>
          <h2 className="text-2xl font-semibold">{params.subjectCode}</h2>
        </div>
        <div>
          <Button
            variant="link"
            onClick={() => setPage(1)}
            className={cn(
              "font-normal",
              page === 1 && "font-semibold hover:no-underline"
            )}
          >
            Videos
          </Button>
          <Button
            variant="link"
            onClick={() => setPage(2)}
            className={cn(
              "font-normal",
              page === 2 && "font-semibold hover:no-underline"
            )}
          >
            Exam
          </Button>
          <Button
            variant="link"
            onClick={() => setPage(3)}
            className={cn(
              "font-normal",
              page === 3 && "font-semibold hover:no-underline"
            )}
          >
            Grades
          </Button>
        </div>
      </div>
      <div>
        {page === 1 ? (
          <div>
            <div className="flex justify-between items-center">
              <PageTitle title="Manage PRL Videos" />
              <AddVideoButton subjectCode={params.subjectCode} />
            </div>
            <SubjectVideos />
          </div>
        ) : null}
        {page === 2 ? (
          <ManageExam params={{ subjectCode: params.subjectCode }} />
        ) : null}
        {page === 3 ? <div>Grades</div> : null}
      </div>
    </div>
  );
}
