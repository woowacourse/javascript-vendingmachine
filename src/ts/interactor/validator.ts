import { Product } from '../../index.d';
import { PRODUCT_RULES, INPUT_MONEY_RULES, MAX_HAVE_MONEY, ERROR_MESSAGE } from '../constant';

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
    if (inputMoney % INPUT_MONEY_RULES.MOD_UNIT > 0) throw new Error(ERROR_MESSAGE.INDIVISIBLE_INPUT_MONEY_MOD_UNIT);
    if (inputMoney < INPUT_MONEY_RULES.MIN) throw new Error(ERROR_MESSAGE.LACK_OF_INPUT_MONEY);
    if (inputMoney + totalAmount > MAX_HAVE_MONEY) throw new Error(ERROR_MESSAGE.EXCEED_MAX_HAVE_MONEY);
  },

  checkChargeUserMoney(userInputMoney: number) {
    if (userInputMoney % 10 > 0) throw new Error('투입 금액은 10의 배수로 입력해주세요!');
    if (userInputMoney > 10000) throw new Error('최대 10,000원까지 투입 가능합니다!');
  },
};

export default validator;
