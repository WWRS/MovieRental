import { DataTypes } from "sequelize";
import db from "../libs/db";

/** MajorActor model */
const MajorActor = db.define(
  "MajorActor",
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
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    indexes: [{ fields: ["movieId"] }],
  }
);

export default MajorActor;
