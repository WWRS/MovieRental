import { Sequelize } from "sequelize";
import config from "config";

/** Sequelize database object */
const db = new Sequelize(config.get("db.uri"), { logging: false });
export default db;
