import { assertCustomerExists } from "../models/Customer";
import { getMovieBySearchOptions } from "../models/Movie";
import Transaction from "../models/Transaction";
import "../models/Associations";

/** Perform a single movie borrow. Groups is the raw match groups, without undefineds */
export default async function borrow(groups) {
  const customerId = Number(groups[2]);
  await assertCustomerExists(customerId);

  const movie = await getMovieBySearchOptions(groups[4], groups[5], groups[6]);

  const numAvailable = await Transaction.sum("amount", {
    where: { movieId: movie.id },
  });
  // The Sequelize community disagrees on what summing nothing should return, so handle null and NaN for safety
  if (!numAvailable || numAvailable <= 0) {
    throw "Can't borrow, movie out of stock";
  }

  await Transaction.create({
    customerId,
    movieId: movie.id,
    amount: -1,
  });
}
