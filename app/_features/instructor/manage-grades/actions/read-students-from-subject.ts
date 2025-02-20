"use server";

import { getDatabaseConnection } from "@/lib/db";

export async function GetStudentList({ subjectCode }: { subjectCode: string }) {
  const sql = getDatabaseConnection();

  try {
    const [{ afos_code }] = await sql`SELECT afos_code FROM subjects 
      JOIN modules ON subjects.module_id = modules.module_id
      WHERE subjects.subject_code = ${subjectCode}`;

    const students =
      await sql`SELECT user_id FROM Students WHERE afos_code = ${afos_code}`;

    // Extract student ids from the students array
    const studentUserIds = students.map((student) => student.user_id);

    const studentList = await Promise.all(
      studentUserIds.map(async (studentUserId) => {
        const [student] =
          await sql`SELECT serial_number, first_name, last_name, middle_initial FROM Users JOIN Students ON Users.user_id = Students.user_id WHERE Users.user_id = ${studentUserId};
      `;

        return student;
      }) || []
    );

    const [{ exam_id }] =
      await sql`SELECT exam_id FROM WrittenExams WHERE subject = ${subjectCode}`;

    const writtenScores = await Promise.all(
      studentList.map(async (student) => {
        const [score] =
          await sql`SELECT * FROM StudentWrittenScores WHERE student_serial = ${student.serial_number} AND written_exam = ${exam_id}`;

        return score;
      })
    );

    const mergedData = studentList.map((student) => {
      // Find the matching score object based on serial_number
      const scoreEntry = writtenScores.find(
        (score) => score?.student_serial === student.serial_number
      );

      return {
        ...student,
        score: scoreEntry ? scoreEntry.score : null,
      };
    });

    if (studentList.length === 0) {
      return { success: false, message: "No students found" };
    }
    return {
      success: true,
      data: mergedData,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "An error occurred",
    };
  }
}
