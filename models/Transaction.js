import { DataTypes } from "sequelize";
import db from "../libs/db";

/** Transaction model */
const Transaction = db.define(
  "Transaction",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    movieId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    customerId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true, // null for stock actions, such as adding stock
    },
    // -1 on borrow, +1 on return
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    indexes: [{ fields: ["movieId"] }, { fields: ["customerId"] }],
  }
);

export default Transaction;
