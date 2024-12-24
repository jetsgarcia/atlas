"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function AddVideoButton({
  subjectCode,
}: {
  subjectCode: string;
}) {
  const router = useRouter();
  return (
    <Button
      onClick={() => {
        router.push(`/instructor/subjects/${subjectCode}/upload-video`);
      }}
    >
      <Plus />
      <span>Add</span>
    </Button>
  );
}
