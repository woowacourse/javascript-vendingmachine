import { Product } from "../mananger/ProductManager";
import { PRODUCT, CHARGE, ERROR_MESSAGES } from "./constants";

const verifyProductName = (name: string) => {
  if (name === "") {
    throw new Error(ERROR_MESSAGES.EMPTY_PRODUCT_NAME);
  }

  if (name.length > PRODUCT.MAX_LENGTH) {
    throw new Error(ERROR_MESSAGES.EXCEED_PRODUCT_LENGTH);
  }
};

const verifyProductPrice = (price: number) => {
  if (price < PRODUCT.MIN_PRICE || price > PRODUCT.MAX_PRICE) {
    throw new Error(ERROR_MESSAGES.INVALID_PRODUCT_PRICE_RANGE);
  }

  if (price % PRODUCT.UNIT !== 0) {
    throw new Error(ERROR_MESSAGES.INVALID_PRODUCT_PRICE_UNIT);
  }
};

const verifyProductQuantity = (quantity: number) => {
  if (quantity > PRODUCT.MAX_QUANTITY || quantity < PRODUCT.MIN_QUANTITY) {
    throw new Error(ERROR_MESSAGES.INVALID_PRODUCT_QUANTITY_RANGE);
  }

  if (quantity - Math.floor(quantity)) {
    throw new Error(ERROR_MESSAGES.INVALID_PRODUCT_QUANTITY_UNIT);
  }

  if (!quantity) {
    throw new Error(ERROR_MESSAGES.EMPTY_PRODUCT_QUANTITY);
  }
};

const verifyDuplicateName = (products: Product[], newProduct: Product) => {
  if (products.some((product) => product.name === newProduct.name)) {
    throw new Error(ERROR_MESSAGES.DUPLICATED_PRODUCT_NAME);
  }
};

const verifyCharge = (charge: number) => {
  if (charge < CHARGE.MIN_PRICE || charge > CHARGE.MAX_PRICE) {
    throw new Error(ERROR_MESSAGES.INVALID_CHARGE_RANGE);
  }

  if (charge % CHARGE.UNIT !== 0) {
    throw new Error(ERROR_MESSAGES.INVALID_CHARGE_UNIT);
  }

  if (!charge) {
    throw new Error(ERROR_MESSAGES.EMPTY_CHARGE_AMOUNT);
  }
};

export { verifyProductName, verifyProductPrice, verifyProductQuantity, verifyDuplicateName, verifyCharge };
