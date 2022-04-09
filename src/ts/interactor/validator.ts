import { Product, AdminData, AdminEmail, AdminPassword } from '../../index.d';
import { PRODUCT_RULES, INPUT_MONEY_RULES, USER_INPUT_MONEY_RULES, ADMIN_DATA_RULES, ERROR_MESSAGE } from '../constant';

const checkProduct = ({ name, price, quantity }: Product): void => {
  if (name === '') throw new Error(ERROR_MESSAGE.EMPTY_PRODUCT_NAME);
  if (name.length > PRODUCT_RULES.MAX_NAME_LENGTH) throw new Error(ERROR_MESSAGE.OUT_OF_RANGE_PRODUCT_NAME);
  if (price < PRODUCT_RULES.MIN_PRICE || price > PRODUCT_RULES.MAX_PRICE) throw new Error(ERROR_MESSAGE.OUT_OF_RANGE_PRODUCT_PRICE);
  if (price % PRODUCT_RULES.PRICE_MOD_UNIT > 0) throw new Error(ERROR_MESSAGE.INDIVISIBLE_PRICE_MOD_UNIT);
  if (quantity < PRODUCT_RULES.MIN_QUANTITY || quantity > PRODUCT_RULES.MAX_QUANTITY) throw new Error(ERROR_MESSAGE.OUT_OF_RANGE_PRODUCT_QUANTITY);
};

const checkAdminEmail = (email: AdminEmail) => {
  if (!/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i.test(email as unknown as string)) throw new Error(ERROR_MESSAGE.INVALID_FORM_EMALI);
};

const checkAdminPassword = (password: AdminPassword) => {
  if ((password as unknown as string).length < ADMIN_DATA_RULES.MIN_PASSWORD_LENGTH || (password as unknown as string).length > ADMIN_DATA_RULES.MAX_PASSWORD_LENGTH) throw new Error(ERROR_MESSAGE.OUT_OF_RANGE_ADMIN_PASSWORD);
  if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,15}$/.test(password as unknown as string)) throw new Error(ERROR_MESSAGE.INVALID_FORM_ADMIN_PASSWORD);
}

const checkAdmin = ({ name, password, passwordConfirmation }: AdminData): void => {
  if ((name as unknown as string).length < ADMIN_DATA_RULES.MIN_NAME_LENGTH || (name as unknown as string).length > ADMIN_DATA_RULES.MAX_NAME_LENGTH) throw new Error(ERROR_MESSAGE.OUT_OF_RANGE_ADMIN_NAME);
  checkAdminPassword(password as unknown as AdminPassword);
  if (password !== passwordConfirmation) throw new Error(ERROR_MESSAGE.MISMATCH_PASSWORD_CONFIRMATION);
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
    if (inputMoney + totalAmount > INPUT_MONEY_RULES.MAX_HAVE) throw new Error(ERROR_MESSAGE.EXCEED_MAX_HAVE_MONEY);
  },

  checkChargeUserMoney(userInputMoney: number, totalUserInputMoney: number) {
    if (userInputMoney % USER_INPUT_MONEY_RULES.MOD_UNIT > 0) throw new Error(ERROR_MESSAGE.INDIVISIBLE_USER_INPUT_MONEY_MOD_UNIT);
    if (userInputMoney + totalUserInputMoney > USER_INPUT_MONEY_RULES.MAX_HAVE) throw new Error(ERROR_MESSAGE.EXCEED_MAX_USER_INPUT_MONEY);
  },

  checkSignupAdmin(adminData: AdminData) {
    checkAdminEmail(adminData.email as unknown as AdminEmail);
    checkAdmin(adminData);
  },

  checkModifyAdmin(adminData: AdminData) {
    checkAdmin(adminData);
  },

  checkLogin(email: AdminEmail, password: AdminPassword) {
    checkAdminEmail(email);
    checkAdminPassword(password);
  },
};

export default validator;
