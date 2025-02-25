"use client";

import Link from "next/link";

// Components
import { ChevronLeft } from "lucide-react";
import ManageSubjectLinks from "@/app/(routes)/instructor/subjects/[subjectCode]/_components/manage-subject-links";
import { usePathname } from "next/navigation";

export default function Layout({
  params,
  children,
}: {
  params: { subjectCode: string };
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div>
      <div className="flex items-center gap-10 mb-4">
        <div className="flex items-center gap-4">
          <Link
            href={
              /^\/instructor\/subjects\/[^/]+\/exam\/[^/]+$/.test(pathname)
                ? `/instructor/subjects/${pathname.split("/")[3]}/exam`
                : "/instructor/subjects"
            }
          >
            <ChevronLeft />
          </Link>
          <h2 className="text-2xl font-semibold">{params.subjectCode}</h2>
        </div>
        <ManageSubjectLinks subjectCode={params.subjectCode.toString()} />
      </div>
      <div>{children}</div>
    </div>
  );
}
