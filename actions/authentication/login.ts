"use server";

import { cookies } from "next/headers";
import { getDatabaseConnection } from "@/lib/db";

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const sql = getDatabaseConnection();

  try {
    // Check if email exists
    const emailFound =
      await sql`SELECT 1 FROM Users WHERE email = ${email} LIMIT 1`;

    if (!emailFound) {
      return { success: false, message: "No email found" };
    }

    // Check if email and password match
    const user =
      await sql`SELECT * FROM Users WHERE email = ${email} AND password = ${password}`;

    if (!user) {
      return {
        success: false,
        message: "Invalid password",
      };
    } else {
      const userType = user[0].role;
      let redirectURL = "";

      if (userType === "Instructor") {
        redirectURL = "/instructor/subjects";
      } else if (userType === "Admin") {
        redirectURL = "/admin/dashboard";
      } else if (userType === "Student") {
        redirectURL = "/student/courses";
        const afosDesignation =
          await sql`SELECT * FROM Students WHERE user_id = ${user[0].user_id}`;
        (await cookies()).set("afosDesignation", afosDesignation[0].afos_code, {
          httpOnly: true,
          maxAge: 60 * 60 * 24,
        });
      }

      (await cookies()).set("userType", userType, {
        httpOnly: true,
        maxAge: 60 * 60 * 24,
      });

      (await cookies()).set("userId", user[0].user_id, {
        httpOnly: true,
        maxAge: 60 * 60 * 24,
      });

      return {
        success: true,
        data: user,
        redirectURL: redirectURL,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "An error occurred",
    };
  }
}
