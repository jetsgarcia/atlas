"use client";

import AverageGradeStatistics from "@/app/_features/admin/dashboard/components/average-grades-statistics";
import UserStatistics from "@/app/_features/admin/dashboard/components/user-statistics";

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-wrap w-full gap-4">
      <UserStatistics />
      <AverageGradeStatistics />
    </div>
  );
}
