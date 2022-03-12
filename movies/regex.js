/** Matches a movie category other than Classics */
export const nonClassicsCategoryString = "([FD])";
/** Matches any nonnegative integer */
export const integerString = "(\\d+?)";
/** Matches a person's name, first and last, separated by a space */
export const nameString = "([^,]+?)";
/** Matches a movie title */
export const titleString = "([^,]+?)";
/** Matches a year (4 digits) */
export const yearString = "(\\d{4})";

/** Matches a Classics release date (month year) */
export const classicsDateString = "((?:[1-9]|10|11|12) \\d{4})";

/**
 * Matches a movie line (non-Classics) such as
 * <pre>
 *   F, 123, director name, movie title, 4567
 * </pre>
 * and gets groups
 * <pre>
 *   F<br>
 *   123<br>
 *   director name<br>
 *   movie title<br>
 *   4567
 * </pre>
 */
export const nonClassicsMovieLineString =
  "^" +
  nonClassicsCategoryString +
  ", " +
  integerString +
  ", " +
  nameString +
  ", " +
  titleString +
  ", " +
  yearString +
  "\\s*$";

/**
 * Matches a movie line (Classics) such as
 * <pre>
 *   C, 123, director name, movie title, actor name 4 5678
 * </pre>
 * and gets groups
 * <pre>
 *   C<br>
 *   123<br>
 *   director name<br>
 *   movie title<br>
 *   actor name<br>
 *   4 5678
 * </pre>
 */
export const classicsMovieLineString =
  "^(C), " +
  integerString +
  ", " +
  nameString +
  ", " +
  titleString +
  ", " +
  nameString +
  " " +
  classicsDateString +
  "\\s*$";

/** Matches a Classics or non-Classics movie line */
export const movieLineString =
  classicsMovieLineString + "|" + nonClassicsMovieLineString;

/** Matches a Classics or non-Classics movie line */
export const movieLine = new RegExp(movieLineString);

/** Matches a classics identification string */
export const classicsSortString =
  "(C) " + classicsDateString + " " + nameString;

/** Matches a comedy identification string */
export const comedySortString = "(F) " + titleString + ", " + yearString;

/** Matches a drama identification string */
export const dramaSortString = "(D) " + nameString + ", " + titleString + ",";
