import { assertCustomerExists } from "../models/Customer";
import { getMovieBySearchOptions } from "../models/Movie";
import Transaction from "../models/Transaction";
import "../models/Associations";

/** Perform a single movie return. Groups is the raw match groups, without undefineds */
export default async function return_(groups) {
  const customerId = Number(groups[2]);
  await assertCustomerExists(customerId);

  const movie = await getMovieBySearchOptions(groups[4], groups[5], groups[6]);

  // Negative because borrowing adds a transaction with amount -1
  const negativeBorrowedAmount = await Transaction.sum("amount", {
    where: { customerId, movieId: movie.id },
  });
  // The Sequelize community disagrees on what summing nothing should return, so handle null and NaN for safety
  if (!negativeBorrowedAmount || negativeBorrowedAmount >= 0) {
    throw "Can't return, user doesn't have movie borrowed";
  }

  await Transaction.create({
    customerId,
    movieId: movie.id,
    amount: 1,
  });
}
