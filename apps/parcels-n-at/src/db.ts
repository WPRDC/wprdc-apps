import "server-only";

import postgres from "postgres";

// will use psql environment variables, except PGSSLMODE, which postgres.js ignores
const sql = postgres({
  ssl: "prefer",
});

export default sql;
