import sequelize from "sequelize";
import "../models/Associations";
import Transaction from "../models/Transaction";
import Movie from "../models/Movie";

/** Prints the current movie inventory of the store */
export default async function inventory(groups) {
  const transactions = await Transaction.findAll({
    include: {
      model: Movie,
      required: true,
      attributes: ["title", "release"],
    },
    group: ["movieId"],
    attributes: [[sequelize.fn("SUM", sequelize.col("amount")), "inStock"]],
  });

  console.log("Inventory:");
  transactions.forEach((transaction) => {
    const { inStock, Movie } = transaction.dataValues;
    const { title, release } = Movie;
    console.log(`  ${inStock}:\t${title} (${release})`);
  });
  console.log();
}
