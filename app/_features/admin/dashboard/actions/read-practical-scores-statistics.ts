"use server";

import { getDatabaseConnection } from "@/lib/db";

export async function ReadPracticalScoresStatistics() {
  const sql = getDatabaseConnection();

  try {
    const records = await sql`SELECT * FROM StudentPracticalScores`;
    if (records.length === 0) {
      return { success: false, message: "No practical score records found" };
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
