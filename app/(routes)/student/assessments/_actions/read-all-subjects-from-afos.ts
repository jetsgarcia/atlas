"use server";

import { getDatabaseConnection } from "@/lib/db";

export async function ReadAllSubjectsFromAFOS({
  afosCode,
}: {
  afosCode: string;
}) {
  const sql = getDatabaseConnection();

  try {
    const records = await sql`
    SELECT s.subject_code 
    FROM subjects s
    JOIN modules m ON s.module_id = m.module_id
    WHERE m.afos_code = ${afosCode}
  `;
    const subjectCodes = records.map((record) => record.subject_code);

    if (subjectCodes.length === 0) {
      return { success: false, message: "No subjects found" };
    }
    return {
      success: true,
      data: subjectCodes,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "An error occurred",
    };
  }
}
