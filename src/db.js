import pg from "pg";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be provided");
}

export const db = new pg.Pool({connectionString: process.env.DATABASE_URL});
