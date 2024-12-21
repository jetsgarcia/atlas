"use client";

import ReadUser from "@/actions/admin/read-user";
import Loader from "@/components/loader";
import PageTitle from "@/components/page-title";
import { useEffect, useState } from "react";
import EditUserButton from "./_components/edit-user-button";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import DeleteUserButton from "./_components/delete-user-button";

type User = {
  user_id: number;
  last_name: string;
  first_name: string;
  middle_initial?: string;
  suffix?: string;
  email: string;
  password: string;
  role: "Admin" | "Student" | "Instructor";
};

export default function ManageSubjectsPage({
  params,
}: {
  params: { userId: number };
}) {
  const [user, setUser] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const { success, data, message } = await ReadUser({
          user_id: params.userId,
        });
        if (success) {
          setUser(data as Array<User>);
        } else {
          console.log(message || "An error occurred");
        }
      } catch (error: unknown) {
        console.log(
          error instanceof Error ? error.message : "An error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchUserData();
  }, [params.userId]);

  return (
    <div className="max-w-[60rem] m-auto rounded-md p-4 grid gap-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <Link
            href="/admin/manage-users"
            className="transition-all ease-in-out hover:text-green-900"
          >
            <ChevronLeft />
          </Link>
          <PageTitle title="Manage User" />
        </div>
        <div className="flex gap-2">
          <EditUserButton userId={params.userId} />
          <DeleteUserButton userId={params.userId} />
        </div>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="px-2 py-5">
          <p className="flex gap-1">
            <span className="font-bold">User ID:</span>
            {params.userId}
          </p>
          <p className="flex gap-1">
            <span className="font-bold">Last Name:</span>
            {user[0].last_name}
          </p>
          <p className="flex gap-1">
            <span className="font-bold">First Name:</span>
            {user[0].first_name}
          </p>
          <p className="flex gap-1">
            <span className="font-bold">Middle Initial:</span>
            {user[0]?.middle_initial || "N/A"}
          </p>
          <p className="flex gap-1">
            <span className="font-bold">Suffix:</span>
            {user[0]?.suffix || "N/A"}
          </p>
          <p className="flex gap-1">
            <span className="font-bold">Email:</span>
            {user[0].email}
          </p>
          <p className="flex gap-1">
            <span className="font-bold">Password:</span>
            {user[0].password}
          </p>
          <p className="flex gap-1">
            <span className="font-bold">Role:</span> {user[0].role}
          </p>
        </div>
      )}
    </div>
  );
}
