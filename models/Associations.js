import Customer from "./Customer";
import MajorActor from "./MajorActor";
import Movie from "./Movie";
import Transaction from "./Transaction";

// Movie <-> MajorActor
Movie.hasMany(MajorActor, { foreignKey: "movieId" });
MajorActor.belongsTo(Movie, {
  foreignKey: "movieId",
  targetKey: "id",
});

// Customer <-> Transaction
Customer.hasMany(Transaction, { foreignKey: "customerId" });
Transaction.belongsTo(Customer, {
  foreignKey: "customerId",
  targetKey: "id",
});

// Movie <-> Transaction
Movie.hasMany(Transaction, { foreignKey: "movieId" });
Transaction.belongsTo(Movie, {
  foreignKey: "movieId",
  targetKey: "id",
});
