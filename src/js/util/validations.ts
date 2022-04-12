import { ISingleProduct } from "../interface/product.interface";
import { ERROR_MESSAGE, VENDING_MACHINE_BOUNDARY_NUMBER } from "../constant";

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
  if (name.length < 2 || name.length > 6) {
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
  const regEx = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );
  if (!regEx.test(password)) {
    throw new Error(
      "비밀번호는 8자 이상이어야 하며, 대소문자 영어, 숫자, 특수문자의 조합이어야 합니다. 공백은 허용하지 않습니다."
    );
  }
};
