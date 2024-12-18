"use server";

import { getDatabaseConnection } from "@/lib/db";

export default async function ReadAllUsers() {
  const sql = getDatabaseConnection();

  try {
    const records = await sql`SELECT * FROM Users`;
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