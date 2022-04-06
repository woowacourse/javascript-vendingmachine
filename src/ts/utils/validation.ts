import { Product } from "../mananger/ProductManager";
import { PRODUCT, CHARGE, ERROR_MESSAGES, PURCAHSE } from "./constants";

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

const verifyPurchaseAmountInput = (amount: number) => {
  if (amount < PURCAHSE.MIN_AMOUNT || amount > PURCAHSE.MAX_AMOUNT) {
    throw new Error(ERROR_MESSAGES.INVALID_PURCHASE_AMOUNT_RANGE);
  }
  if (amount % PURCAHSE.UNIT !== 0) {
    throw new Error(ERROR_MESSAGES.INVALID_PURCHASE_AMOUNT_UNIT);
  }
};

const verifyPurchaseProduct = (stock: number, purchaseAmount: number, productPrice: number) => {
  if (stock <= 0) {
    throw new Error(ERROR_MESSAGES.NOT_ENOUGH_PURCHASE_STOCK);
  }
  if (purchaseAmount < productPrice) {
    throw new Error(ERROR_MESSAGES.NOT_ENOUGH_PURCHASE_AMOUNT);
  }
};

const verifyPurchaseAmountBalance = (amount: number) => {
  if (amount === 0) {
    throw new Error(ERROR_MESSAGES.NOT_ENOUGH_INPUT_AMOUNT);
  }
};

const verifyPurchaseAmountReturn = (amount: number) => {
  if (amount === 0) {
    throw new Error(ERROR_MESSAGES.NOT_ENOUGH_RETURN_COIN);
  }
};

export {
  verifyProductName,
  verifyProductPrice,
  verifyProductQuantity,
  verifyDuplicateName,
  verifyCharge,
  verifyPurchaseAmountInput,
  verifyPurchaseProduct,
  verifyPurchaseAmountBalance,
  verifyPurchaseAmountReturn,
};
