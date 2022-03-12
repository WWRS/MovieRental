import forEachLine from "../libs/lineReader";
import { actionLine } from "./regex";
import borrow from "./borrow";
import history from "./history";
import inventory from "./inventory";
import return_ from "./return";

/** Reads from a file of actions and performs them in sequence */
export default async function runActions(filePath) {
  await forEachLine(filePath, async function (line) {
    const match = line.match(actionLine);
    if (match === null) {
      console.error("Cannot read action line:\n   " + line);
      return;
    }

    const groups = match.filter((match) => match !== undefined);

    try {
      switch (groups[1]) {
        case "B":
          await borrow(groups);
          break;
        case "H":
          await history(groups);
          break;
        case "I":
          await inventory(groups);
          break;
        case "R":
          await return_(groups);
          break;
        default:
          // should never get here
          throw "Matched but could not find action";
      }
    } catch (e) {
      console.error(e + ":\n   " + line);
    }
  });
}
