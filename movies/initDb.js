import { movieLine } from "./regex";
import forEachLine from "../libs/lineReader";
import Movie, { genres } from "../models/Movie";
import Transaction from "../models/Transaction";
import MajorActor from "../models/MajorActor";

/** Reads from a file of movies and builds the DB */
export default async function initMovieDb(filePath) {
  await forEachLine(filePath, async function (line) {
    const match = line.match(movieLine);
    if (match === null) {
      console.error("Cannot read movie line:\n   " + line);
      return;
    }

    const groups = match.filter((match) => match !== undefined);

    const [movie] = await Movie.findOrCreate({
      where: {
        genre: genres[groups[1]],
        director: groups[3],
        title: groups[4],
        release: groups[groups.length - 1],
      },
      attributes: ["id"],
    });

    // Set initial stock
    await Transaction.create({
      movieId: movie.id,
      amount: Number(groups[2]),
      customerId: null,
    });

    // Maybe register major actor
    if (groups[1] === "C") {
      await MajorActor.findOrCreate({
        where: {
          movieId: movie.id,
          name: groups[5],
        },
        attributes: ["id"],
      });
    }
  });
}
