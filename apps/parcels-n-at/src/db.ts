import "server-only";

import postgres from "postgres";

const sql = postgres({
  /* options */
  debug: console.log,
}); // will use psql environment variables

export default sql;
