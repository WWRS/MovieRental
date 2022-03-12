import { DataTypes } from "sequelize";
import db from "../libs/db";
import MajorActor from "./MajorActor";

/** Map from letter representation to human-readable string */
export const genres = {
  F: "Comedy",
  D: "Drama",
  C: "Classics",
};

/** Gets a movie from the database by sorting criteria */
export async function getMovieBySearchOptions(category, prop1, prop2) {
  const movie = await Movie.findOne(getSearchOptions(category, prop1, prop2));

  if (movie === null) {
    throw "Could not find matching movie";
  }

  return movie;
}

/** Movie model */
const Movie = db.define(
  "Movie",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    genre: {
      type: DataTypes.ENUM(...Object.values(genres)),
      allowNull: false,
    },
    director: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    release: {
      type: DataTypes.STRING(7),
      allowNull: false,
    },
  },
  {
    indexes: [
      { fields: ["genre"] },
      { fields: ["director"] },
      { fields: ["title"] },
      { fields: ["release"] },
    ],
  }
);

/** Converts sorting criteria to database search options */
function getSearchOptions(category, prop1, prop2) {
  switch (category) {
    case "F":
      return { where: { title: prop1, release: prop2 } };
    case "D":
      return { where: { director: prop1, title: prop2 } };
    case "C":
      return {
        where: { release: prop1 },
        include: {
          model: MajorActor,
          where: { name: prop2 },
          required: true,
        },
      };
  }
}

export default Movie;
