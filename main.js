import config from "config";
import initMovieDb from "./movies/initDb";
import initCustomerDb from "./customers/initDb";
import runActions from "./actions/run";
import db from "./libs/db";

/** Main entrypoint of the program */
async function main() {
  // Start up the DB
  await db.sync();

  // Initialize DB
  await initMovieDb(config.get("files.movies"));
  await initCustomerDb(config.get("files.customers"));

  // Perform actions
  await runActions(config.get("files.actions"));

  console.log("Done");
}

main();
