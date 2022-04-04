import { Product } from '../resource/declaration';
import { ALERT_MESSAGE, PRODUCT_RULES } from '../constants';

export const isValidProductInfo = (
  { name, price, quantity }: Product,
  index: number,
  products: Array<Product>,
) => {
  if (
    name.length < PRODUCT_RULES.MIN_NAME_LENGTH ||
    name.length > PRODUCT_RULES.MAX_NAME_LENGTH
  ) {
    alert(ALERT_MESSAGE.PRODUCT_NAME_LENGTH);
    return false;
  }

  if (
    products.some(
      (product: Product, productIndex) =>
        productIndex !== index && product.name === name,
    )
  ) {
    alert(ALERT_MESSAGE.PRODUCT_NAME_UNIQUE);
    return false;
  }

  if (
    price < PRODUCT_RULES.MIN_PRICE ||
    price > PRODUCT_RULES.MAX_PRICE ||
    price % PRODUCT_RULES.PRICE_MOD_UNIT !== 0
  ) {
    alert(ALERT_MESSAGE.PRODUCT_PRICE);
    return false;
  }

  if (
    quantity < PRODUCT_RULES.MIN_QUANTITY ||
    quantity > PRODUCT_RULES.MAX_QUANTITY
  ) {
    alert(ALERT_MESSAGE.PRODUCT_QUANTITY);
    return false;
  }

  return true;
};

export const canBuyProduct = (
  { price, quantity }: Product,
  totalMoney: number,
) => {
  if (quantity < 1) {
    return false;
  }
  if (totalMoney < price) {
    return false;
  }

  return true;
};
