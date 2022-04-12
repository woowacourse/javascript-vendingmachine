import { Product, Coin, LoginInfo, UserInfo } from '../declarations/resourceDeclaration';
import { ALERT_MESSAGE, CHARGE_MONEY_RULES, INPUT_MONEY_RULES, PRODUCT_RULES } from '../constants';
import { showSnackbar } from '../utils/snackbar';

class VerifyValueValidation implements VerifyValueValidation {
  private products: Array<Product>;
  private coins: Array<Coin>;

  constructor(products: Array<Product> = [], coins: Array<Coin> = []) {
    this.products = products;
    this.coins = coins;
  }

  validator = conditions => {
    let isValid = true;
    conditions.forEach(({ checker, errorMessage }) => {
      if (!checker()) {
        showSnackbar(errorMessage);
        isValid = false;
      }
    });
    return isValid;
  };

  // 각각의 전체 검증
  verifyProductInfo({ name, price, quantity }: Product, index: number) {
    return this.validator([
      {
        checker: () => this.isValidProductNameRange(name),
        errorMessage: ALERT_MESSAGE.PRODUCT_NAME_LENGTH,
      },
      {
        checker: () => this.isUniqueProductName(name, index),
        errorMessage: ALERT_MESSAGE.PRODUCT_NAME_UNIQUE,
      },
      {
        checker: () => this.isValidProductPrice(price),
        errorMessage: ALERT_MESSAGE.PRODUCT_PRICE,
      },
      {
        checker: () => this.isValidProductQuantity(quantity),
        errorMessage: ALERT_MESSAGE.PRODUCT_QUANTITY,
      },
    ]);
  }

  verifyChargeMoney(chargeMoney: number) {
    return this.validator([
      {
        checker: () => this.isValidChargeMoney(chargeMoney),
        errorMessage: ALERT_MESSAGE.CHARGE_MONEY,
      },
      {
        checker: () => this.isValidChargeMoneyOver(chargeMoney),
        errorMessage: ALERT_MESSAGE.CHARGE_MONEY_MAX,
      },
    ]);
  }

  verifyInputMoney(inputMoney: number) {
    return this.validator([
      {
        checker: () => this.isValidInputMoneyRange(inputMoney),
        errorMessage: ALERT_MESSAGE.INPUT_MONEY_RANGE,
      },
      {
        checker: () => this.isValidInputMoneyMod(inputMoney),
        errorMessage: ALERT_MESSAGE.INPUT_MONEY_MOD,
      },
    ]);
  }

  verifyLoginInfo({ email, password }: LoginInfo) {
    return this.validator([
      {
        checker: () => this.isValidEmail(email),
        errorMessage: ALERT_MESSAGE.LOGIN,
      },
      {
        checker: () => this.isValidPassWord(password),
        errorMessage: ALERT_MESSAGE.LOGIN,
      },
    ]);
  }

  verifySignUpInfo({ email, name, password, passwordConfirm }: UserInfo) {
    return this.validator([
      {
        checker: () => this.isValidEmail(email),
        errorMessage: ALERT_MESSAGE.USER_EMAIL,
      },
      {
        checker: () => this.isValidName(name),
        errorMessage: ALERT_MESSAGE.USER_NAME,
      },
      {
        checker: () => this.isValidPassWord(password),
        errorMessage: ALERT_MESSAGE.USER_PASSWORD,
      },
      {
        checker: () => this.isValidPassWordConfirm(password, passwordConfirm),
        errorMessage: ALERT_MESSAGE.USER_PASSWORD_CONFIRM,
      },
    ]);
  }

  // 상품 정보 검증
  isValidProductNameRange(name: string) {
    return (
      name.length >= PRODUCT_RULES.MIN_NAME_LENGTH && name.length <= PRODUCT_RULES.MAX_NAME_LENGTH
    );
  }

  isUniqueProductName(name: string, index: number) {
    return !this.products.some(
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
