import { idString as customerIdString } from "../customers/regex";
import {
  classicsSortString,
  comedySortString,
  dramaSortString,
} from "../movies/regex";

/** Matches single-char media types */
export const mediaString = "(D)";

/** Matches any genre identification string */
export const sortString =
  classicsSortString + "|" + comedySortString + "|" + dramaSortString;

/** Matches a borrow or return action line */
export const borrowOrReturnLineString =
  "^(B|R) " +
  customerIdString +
  " " +
  mediaString +
  " (?:" +
  sortString +
  ")\\s*$";
/** Matches an inventory action line */
export const inventoryLineString = "^(I)\\s*$";
/** Matches a history action line */
export const historyLineString = "^(H) " + customerIdString + "\\s*$";

/** Matches any action line */
export const actionLineString =
  borrowOrReturnLineString +
  "|" +
  inventoryLineString +
  "|" +
  historyLineString;

/** Matches any action line */
export const actionLine = new RegExp(actionLineString);
