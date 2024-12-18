import { neon } from "@neondatabase/serverless";

export function getDatabaseConnection() {
  const databaseUrl = `${process.env.DATABASE_URL}`;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL environment variable is not defined");
  }

  return neon(databaseUrl);
}