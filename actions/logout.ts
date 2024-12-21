"use server";

import { cookies } from "next/headers";

export async function logout() {
  const redirectURL = "/";

  // Remove the userType cookie by setting it with a maxAge of 0
  (await cookies()).set("userType", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });

  return {
    success: true,
    message: "Logged out successfully",
    redirectURL,
  };
}
