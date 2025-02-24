"use client";

import { usePathname } from "next/navigation";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

export default function EditSubjectButton({
  subjectCode,
}: {
  subjectCode: string;
}) {
  const path = usePathname();
  const router = useRouter();

  return (
    <DropdownMenuItem
      onClick={() => {
        router.push(`${path}/${subjectCode}/edit`);
      }}
    >
      Edit
    </DropdownMenuItem>
  );
}
