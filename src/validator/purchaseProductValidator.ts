import { Product } from '../domain/Product';
import { ERROR_MESSAGE } from '../constants';

const purchaseProductValidator = {
  isNotEnoughMoney(targetName, products, userInputMoneyAmount) {
    const targetProduct = products.find((product) => product.name === targetName);
    const targetProductPrice = targetProduct.price;

    return targetProductPrice > userInputMoneyAmount;
  },
};

export const validatePurchaseProduct = (targetName: string, products: Product[], userInputMoneyAmount: number) => {
  if (purchaseProductValidator.isNotEnoughMoney(targetName, products, userInputMoneyAmount)) {
    throw new Error(ERROR_MESSAGE.NOT_ENOUGH_MONEY);
  }
};
