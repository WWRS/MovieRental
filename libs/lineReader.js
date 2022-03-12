import fs from "fs";
import readline from "readline";

/** Performs a callback for each line of the given file, in order */
export default async function forEachLine(filePath, callback) {
  const lineReader = readline.createInterface({
    input: fs.createReadStream(filePath),
    crlfDelay: Infinity,
  });

  for await (const line of lineReader) {
    await callback(line);
  }
}
