import { PASSWORD_REGEX, VENDING_MACHINE_NUMBER } from "../constant";

export const isValidName = (name) =>
  name.length <= VENDING_MACHINE_NUMBER.MAX_USER_NAME &&
  name.length >= VENDING_MACHINE_NUMBER.MIN_USER_NAME;

export const isValidPassword = (password) => password.match(PASSWORD_REGEX);
