import { ISingleProduct } from "../interface/product.interface";
import {
  REGEX,
  ERROR_MESSAGE,
  VENDING_MACHINE_BOUNDARY_NUMBER,
  AUTHORIZATION_BOUNDARY_NUMBER,
} from "../constant";

export const validateProductName = (
  products: ISingleProduct[],
  newName: string,
  targetId = ""
) => {
  if (
    products.some((product) => {
      const { name, id } = product.get();
      return name === newName && (targetId === "" || id !== targetId);
    })
  ) {
    throw new Error(ERROR_MESSAGE.DUPLICATED_NAME);
  }

  if (newName.length > VENDING_MACHINE_BOUNDARY_NUMBER.MAXIMUM_NAME_LENGTH) {
    throw new Error(ERROR_MESSAGE.MAXIMUM_NAME_LENGTH);
  }
};

export const validateProductPrice = (price: number) => {
  if (
    price < VENDING_MACHINE_BOUNDARY_NUMBER.MINIMUM_PRICE ||
    price > VENDING_MACHINE_BOUNDARY_NUMBER.MAXIMUM_PRICE ||
    price % VENDING_MACHINE_BOUNDARY_NUMBER.MINIMUM_COIN !== 0
  ) {
    throw new Error(ERROR_MESSAGE.VALID_PRICE);
  }
};

export const validateProductCount = (count: number) => {
  if (!count || count <= VENDING_MACHINE_BOUNDARY_NUMBER.MINIMUM_COUNT) {
    throw new Error(ERROR_MESSAGE.MINIMUM_COUNT);
  }

  if (count > VENDING_MACHINE_BOUNDARY_NUMBER.MAXIMUM_COUNT) {
    throw new Error(ERROR_MESSAGE.MAXIMUM_COUNT);
  }
};

export const validateChanges = (changes: number, totalChanges: number) => {
  if (changes % VENDING_MACHINE_BOUNDARY_NUMBER.MINIMUM_COIN !== 0) {
    throw new Error(ERROR_MESSAGE.DIVIDED_BY_MINIMUM_COIN);
  }
  if (totalChanges > VENDING_MACHINE_BOUNDARY_NUMBER.MAXIMUM_CHANGES) {
    throw new Error(ERROR_MESSAGE.MAXIMUM_CHANGES);
  }

  if (changes <= 0) {
    throw new Error(ERROR_MESSAGE.MINIMUM_CHANGES);
  }
};

export const validateUserName = (name: string) => {
  if (
    name.length < AUTHORIZATION_BOUNDARY_NUMBER.MINIMUM_NAME_LENGTH ||
    name.length > AUTHORIZATION_BOUNDARY_NUMBER.MAXIMUM_NAME_LENGTH
  ) {
    throw new Error(ERROR_MESSAGE.VALID_USER_NAME_LENGTH);
  }
};

export const validateConfirmPassword = (
  password: string,
  confirmPassword: string
) => {
  if (password !== confirmPassword) {
    throw new Error(ERROR_MESSAGE.NOT_CONFIRMED_PASSWORD);
  }
};

export const validatePassword = (password: string) => {
  if (!REGEX.PASSWORD().test(password)) {
    throw new Error(ERROR_MESSAGE.INVALID_PASSWORD);
  }
};
