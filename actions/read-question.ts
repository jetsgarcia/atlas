"use server";

import { getDatabaseConnection } from "@/lib/db";

export async function ReadQuestion({ examId }: { examId: number }) {
  const sql = getDatabaseConnection();

  try {
    const records =
      await sql`SELECT * FROM ExamQuestions WHERE written_exam = ${examId}`;
    if (records.length === 0) {
      return { success: false, message: "No records found" };
    }
    return {
      success: true,
      data: records,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "An error occurred",
    };
  }
}
