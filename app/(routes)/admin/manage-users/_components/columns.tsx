"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export type User = {
  user_id: number;
  last_name: string;
  first_name: string;
  middle_initial?: string;
  suffix?: string;
  email: string;
  password: string;
  role: "Admin" | "Student" | "Instructor";
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "user_id",
    header: "User ID",
    cell: ({ row }) => {
      return (
        <Link
          className="font-medium text-blue-600 underline"
          href={`/admin/manage-users/${row.original.user_id}`}
        >
          {row.original.user_id}
        </Link>
      );
    },
  },
  {
    accessorKey: "last_name",
    header: "Last name",
  },
  {
    accessorKey: "first_name",
    header: "First name",
  },
  {
    accessorKey: "middle_initial",
    header: "Middle initial",
  },
  {
    accessorKey: "suffix",
    header: "Suffix",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "password",
    header: "Password",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    id: "actions",
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
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
