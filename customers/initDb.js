import forEachLine from "../libs/lineReader";
import { customerLine } from "./regex";
import Customer from "../models/Customer";

/** Reads from a file of customers and builds the DB */
export default async function initCustomerDb(filePath) {
  await forEachLine(filePath, async function (line) {
    const match = line.match(customerLine);
    if (match === null) {
      console.error("Cannot read customer line:\n   " + line);
      return;
    }

    const groups = match.filter((match) => match !== undefined);

    const [, customerCreated] = await Customer.findOrCreate({
      where: {
        id: Number(groups[1]),
      },
      defaults: {
        lastName: groups[2],
        firstName: groups[3],
      },
      attributes: ["id"],
    });

    if (!customerCreated) {
      console.error("A customer with this id already exists:\n   " + line);
    }
  });
}
