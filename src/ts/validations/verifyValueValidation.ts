import { Product, Coin, LoginInfo, UserInfo } from '../declarations/resourceDeclaration';
import { ALERT_MESSAGE, CHARGE_MONEY_RULES, INPUT_MONEY_RULES, PRODUCT_RULES } from '../constants';
import { displaySnackbar } from '../utils/snackbar';

class VerifyValueValidation implements VerifyValueValidation {
  private products: Array<Product>;
  private coins: Array<Coin>;

  constructor(products: Array<Product>, coins: Array<Coin>) {
    this.products = products;
    this.coins = coins;
  }

  // 각각의 전체 검증
  verifyProductInfo({ name, price, quantity }: Product, index: number) {
    if (!this.isValidProductNameRange(name)) {
      displaySnackbar(ALERT_MESSAGE.PRODUCT_NAME_LENGTH);
      return false;
    }
    if (this.isOverlapProductName(name, index)) {
      displaySnackbar(ALERT_MESSAGE.PRODUCT_NAME_UNIQUE);
      return false;
    }
    if (!this.isValidProductPrice(price)) {
      displaySnackbar(ALERT_MESSAGE.PRODUCT_PRICE);
      return false;
    }
    if (!this.isValidProductQuantity(quantity)) {
      displaySnackbar(ALERT_MESSAGE.PRODUCT_QUANTITY);
      return false;
    }
    return true;
  }

  verifyChargeMoney(chargeMoney: number) {
    if (!this.isValidChargeMoney(chargeMoney)) {
      displaySnackbar(ALERT_MESSAGE.CHARGE_MONEY);
      return false;
    }
    if (!this.isValidChargeMoneyOver(chargeMoney)) {
      displaySnackbar(ALERT_MESSAGE.CHARGE_MONEY_MAX);
      return false;
    }
    return true;
  }

  verifyInputMoney(inputMoney: number) {
    if (!this.isValidInputMoneyRange(inputMoney)) {
      displaySnackbar(ALERT_MESSAGE.INPUT_MONEY_RANGE);
      return false;
    }
    if (!this.isValidInputMoneyMod(inputMoney)) {
      displaySnackbar(ALERT_MESSAGE.INPUT_MONEY_MOD);
      return false;
    }
    return true;
  }

  verifyLoginInfo({ email, password }: LoginInfo) {
    if (!this.isValidEmail(email)) {
      displaySnackbar(ALERT_MESSAGE.USER_EMAIL);
      return false;
    }
    if (!this.isValidPassWord(password)) {
      displaySnackbar(ALERT_MESSAGE.USER_PASSWORD);
      return false;
    }
    return true;
  }

  verifySignUpInfo({ email, name, password, passwordConfirm }: UserInfo) {
    if (!this.isValidEmail(email)) {
      displaySnackbar(ALERT_MESSAGE.USER_EMAIL);
      return false;
    }
    if (!this.isValidName(name)) {
      displaySnackbar(ALERT_MESSAGE.USER_NAME);
      return false;
    }
    if (!this.isValidPassWord(password)) {
      displaySnackbar(ALERT_MESSAGE.USER_PASSWORD);
      return false;
    }
    if (!this.isValidPassWordConfirm(password, passwordConfirm)) {
      displaySnackbar(ALERT_MESSAGE.USER_PASSWORD_CONFIRM);
      return false;
    }
    return true;
  }

  // 상품 정보 검증
  isValidProductNameRange(name: string) {
    return (
      name.length >= PRODUCT_RULES.MIN_NAME_LENGTH && name.length <= PRODUCT_RULES.MAX_NAME_LENGTH
    );
  }

  isOverlapProductName(name: string, index: number) {
    return this.products.some(
      (product: Product, productIndex) => productIndex !== index && product.name === name,
    );
  }

  isValidProductPrice(price: number) {
    return (
      price >= PRODUCT_RULES.MIN_PRICE &&
      price <= PRODUCT_RULES.MAX_PRICE &&
      price % PRODUCT_RULES.PRICE_MOD_UNIT === 0
    );
  }

  isValidProductQuantity(quantity: number) {
    return quantity >= PRODUCT_RULES.MIN_QUANTITY && quantity <= PRODUCT_RULES.MAX_QUANTITY;
  }

  // 자판기 동전 충전 검증
  isValidChargeMoney(chargeMoney: number) {
    return chargeMoney >= CHARGE_MONEY_RULES.MIN && chargeMoney % CHARGE_MONEY_RULES.MOD_UNIT === 0;
  }

  isValidChargeMoneyOver(chargeMoney: number) {
    return this.totalAmount() + chargeMoney <= CHARGE_MONEY_RULES.MAX;
  }

  // 상품 구매 금액 충전 검증
  isValidInputMoneyRange(inputMoney: number) {
    return inputMoney >= INPUT_MONEY_RULES.MIN && inputMoney <= INPUT_MONEY_RULES.MAX;
  }

  isValidInputMoneyMod(inputMoney: number) {
    return inputMoney % INPUT_MONEY_RULES.MOD_UNIT === 0;
  }

  // 유저 정보 검증
  isValidName(name) {
    const nameReg = /^[가-힣]{2,6}$/;
    return nameReg.test(name);
  }

  isValidEmail(email) {
    const emailReg =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;
    return emailReg.test(email);
  }

  isValidPassWord(password) {
    const passwordReg =
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)-_=+]).{8,16}$/;
    return passwordReg.test(password);
  }

  isValidPassWordConfirm(password, passwordConfirm) {
    return password === passwordConfirm;
  }

  canBuyProduct({ price, quantity }: Product, totalMoney: number) {
    if (quantity < 1) {
      return false;
    }
    if (totalMoney < price) {
      return false;
    }
    return true;
  }

  totalAmount() {
    return this.coins.reduce((acc, { amount, count }) => acc + amount * count, 0);
  }
}

export default VerifyValueValidation;
