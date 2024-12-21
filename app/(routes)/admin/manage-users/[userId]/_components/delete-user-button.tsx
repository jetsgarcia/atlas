"use client";

import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DeleteUserButton({ userId }: { userId: number }) {
  return (
    <Button className="flex gap-3" variant="destructive">
      <Trash />
      <span>Delete</span>
    </Button>
  );
}
