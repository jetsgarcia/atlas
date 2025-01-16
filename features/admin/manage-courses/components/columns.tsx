"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";

// Components
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type AFOS = {
  afos_code: string;
  afos: string;
  level: string;
};

export const columns: ColumnDef<AFOS>[] = [
  {
    accessorKey: "afos_code",
    header: "Code",
    cell: ({ row }) => {
      return (
        <Link
          className="font-medium text-blue-600 underline"
          style={{ width: "10px" }}
          href={`/admin/manage-courses/${row.original.afos_code}`}
        >
          {row.original.afos_code}
        </Link>
      );
    },
  },
  {
    accessorKey: "level",
    header: "Level",
  },
  {
    accessorKey: "afos",
    header: "Name",
    enableResizing: true,
    size: 1,
  },
  {
    id: "actions",
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="text-blue-400">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4 bg-red-500" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
