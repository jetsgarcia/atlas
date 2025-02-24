"use server";

import { getDatabaseConnection } from "@/lib/db";

export default async function UpdateSubject(values: {
  subjectCode: string;
  subject: string;
  instructor: number;
}) {
  const { subjectCode, subject, instructor } = values;
  const trimmedSubjectCode = subjectCode.trim();
  const trimmedSubject = subject.trim();

  const validationError = validate(trimmedSubjectCode, trimmedSubject);
  if (validationError) {
    return { success: false, message: validationError };
  }

  const sql = getDatabaseConnection();
  try {
    // Update existing subject based on subject_code
    const result = await sql`
      UPDATE Subjects
      SET subject = ${trimmedSubject},
          instructor = ${instructor}
      WHERE subject_code = ${trimmedSubjectCode}
    `;
    console.log(result);

    // if (result.count === 0) {
    //   return { success: false, message: "Subject not found for update" };
    // }

    return { success: true, message: "Subject updated successfully" };
  } catch (error: unknown) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again later",
    };
  }
}

function validate(trimmedSubjectCode: string, trimmedSubject: string) {
  if (!trimmedSubjectCode) {
    return "Please provide the AFOS code";
  }
  if (!trimmedSubject) {
    return "Please provide the AFOS name";
  }

  // Letters, numbers, spaces, and hyphens are only allowed for AFOS name
  const SubjectPattern = /^[a-zA-Z0-9\s-]+$/;
  if (!SubjectPattern.test(trimmedSubject)) {
    return "Subject name can only contain letters, numbers, spaces, and hyphens";
  }
}
