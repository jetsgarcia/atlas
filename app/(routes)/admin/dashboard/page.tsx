"use client";

import AverageGradeStatistics from "@/app/(routes)/admin/dashboard/_components/average-grades-statistics";
import UserStatistics from "@/app/(routes)/admin/dashboard/_components/user-statistics";

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-wrap w-full gap-4">
      <UserStatistics />
      <AverageGradeStatistics />
    </div>
  );
}
