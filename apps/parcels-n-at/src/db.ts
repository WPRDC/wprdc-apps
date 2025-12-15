import "server-only";

import postgres from "postgres";

const sql = postgres({
  /* options */
}); // will use psql environment variables

export default sql;
