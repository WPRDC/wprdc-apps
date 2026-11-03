import "server-only";

import postgres from "postgres";

// Both clients use the psql environment variables (PGPORT, PGDATABASE, PGUSERNAME,
// PGPASSWORD), except PGSSLMODE, which postgres.js ignores.

/**
 * Read-only client, connected to the replica at PGHOST_RO.
 *
 * Use this for everything that only reads. Falls back to the primary if
 * PGHOST_RO isn't set.
 */
const sql = postgres({
  host: process.env.PGHOST_RO ?? process.env.PGHOST,
  ssl: "prefer",
});

/**
 * Client connected to the primary at PGHOST.
 *
 * Only use this for queries that need to write, such as creating temp tables -
 * the replica rejects any write.
 */
export const sqlPrimary = postgres({
  host: process.env.PGHOST,
  ssl: "prefer",
});

export default sql;
