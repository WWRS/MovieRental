import _ from "lodash";
import Customer from "../models/Customer";
import Transaction from "../models/Transaction";
import Movie from "../models/Movie";
import "../models/Associations";

/** Prints the history for a given customer. Groups is the raw match groups, without undefineds */
export default async function history(groups) {
  // Get customer with transactions
  const customerId = Number(groups[2]);
  const customer = await Customer.findOne({
    where: { id: customerId },
    attributes: ["id"],
    include: {
      model: Transaction,
      order: ["createdAt", "ASC"],
      attributes: ["amount", "movieId"],
      include: {
        model: Movie,
        attributes: ["title", "release"],
      },
    },
  });

  if (customer === null) {
    throw "Cannot find customer";
  }

  console.log(`Transaction history for customer ${customerId}:`);
  const { Transactions } = customer;
  if (!Transactions || Transactions.length === 0) {
    console.log("   none");
  } else {
    Transactions.forEach(printTransaction);
  }

  console.log(`Customer ${customerId} currently has borrowed:`);
  // Type: movieWithAmount[]
  const borrowed = Object.entries(
    _.groupBy(Transactions, (transaction) => transaction.movieId)
  )
    .map(([, transactions]) => {
      return {
        movie: transactions[0].Movie,
        amount: _.sumBy(transactions, (transaction) => -transaction.amount),
      };
    })
    .filter((movieWithAmount) => movieWithAmount.amount > 0);

  if (borrowed.length === 0) {
    console.log("   none");
  } else {
    borrowed.forEach(printBorrowed);
  }
  console.log();
}

/** Prints a transaction in human-readable format */
function printTransaction(transaction) {
  const { amount } = transaction;
  const { title, release } = transaction.Movie;
  console.log(
    `  ${amount < 0 ? "Borrowed" : "Returned"} ${Math.abs(
      amount
    )}:\t${title} (${release})`
  );
}

/** Prints a movieWithAmount in human-readable format */
function printBorrowed(movieWithAmount) {
  const { title, release } = movieWithAmount.movie;
  console.log(`  ${movieWithAmount.amount}:\t${title} (${release})`);
}
