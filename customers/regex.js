/** Matches any nonnegative integer */
export const idString = "(\\d+?)";
/** Matches a person's name, first or last */
export const nameString = "([^ ]+?)";

/**
 * Matches a customer line, such as
 * <pre>
 *   1234 Last-Name First-Name
 * </pre>
 * and gets groups
 * <pre>
 *   1234<br>
 *   Last-Name<br>
 *   First-Name
 * </pre>
 */
export const customerLineString =
  "^" + idString + " " + nameString + " " + nameString + "\\s*$";

/**
 * Matches a customer line, such as
 * <pre>
 *   1234 Last-Name First-Name
 * </pre>
 * and gets groups
 * <pre>
 *   1234<br>
 *   Last-Name<br>
 *   First-Name
 * </pre>
 */
export const customerLine = new RegExp(customerLineString);
