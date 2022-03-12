import { DataTypes } from "sequelize";
import db from "../libs/db";

/** Does nothing if customer is in the database, throws if customer is not */
export async function assertCustomerExists(id) {
  const customer = await Customer.findOne({
    where: { id },
    attributes: ["id"],
  });
  if (customer === null) {
    throw "Could not find user with given id";
  }
}

/** Customer model */
const Customer = db.define("Customer", {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  firstName: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
});

export default Customer;
