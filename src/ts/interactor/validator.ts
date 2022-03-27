import { Product } from '../../index.d';
import { PRODUCT_RULES, ERROR_MESSAGE } from '../constant';

const checkProduct = ({ name, price, quantity }: Product): void => {
  if (name === '') throw new Error(ERROR_MESSAGE.EMPTY_PRODUCT_NAME);
  if (name.length > PRODUCT_RULES.MAX_NAME_LENGTH) throw new Error(ERROR_MESSAGE.OUT_OF_RANGE_PRODUCT_NAME);
  if (price < PRODUCT_RULES.MIN_PRICE || price > PRODUCT_RULES.MAX_PRICE) throw new Error(ERROR_MESSAGE.OUT_OF_RANGE_PRODUCT_PRICE);
  if (price % PRODUCT_RULES.PRICE_MOD_UNIT > 0) throw new Error(ERROR_MESSAGE.INDIVISIBLE_PRICE_MOD_UNIT);
  if (quantity < PRODUCT_RULES.MIN_QUANTITY || quantity > PRODUCT_RULES.MAX_QUANTITY) throw new Error(ERROR_MESSAGE.OUT_OF_RANGE_PRODUCT_QUANTITY);
};

const validator = {
  checkAdditionalProduct(product: Product, products: Array<Product>) {
    checkProduct(product);
    
    if (products.some(({ name }) => name === product.name)) throw new Error(ERROR_MESSAGE.OVERLAP_PRODUCT);
  },
  
  checkModifiedProduct(product: Product, products: Array<Product>, originProductIndex: number) {
    checkProduct(product);

    if (products.some(({ name }, index) => index !== originProductIndex && name === product.name)) throw new Error(ERROR_MESSAGE.OVERLAP_PRODUCT);
  },

  checkChargeMoney(inputMoney: number, totalAmount: number) {
    if (inputMoney % 10 > 0) throw new Error('투입 금액은 10의 배수로 입력해주세요!');
    if (inputMoney < 1000) throw new Error('1000원 이상 투입해주세요!');
    if (inputMoney + totalAmount > 100000) throw new Error('총 보유할 수 있는 금액은 100,000원 입니다!');
  }
};

export default validator;
