import { Product } from '../domain/Product';
import { ERROR_MESSAGE } from '../constants';

const purchaseProductValidator = {
  isNotEnoughMoney(targetProductName, products, userInputMoneyAmount) {
    const targetProduct = products.find((product) => product.name === targetProductName);
    const targetProductPrice = targetProduct.price;

    return targetProductPrice > userInputMoneyAmount;
  },
};

export const validatePurchaseProduct = (
  targetProductName: string,
  products: Product[],
  userInputMoneyAmount: number,
) => {
  if (purchaseProductValidator.isNotEnoughMoney(targetProductName, products, userInputMoneyAmount)) {
    throw new Error(ERROR_MESSAGE.NOT_ENOUGH_MONEY);
  }
};
