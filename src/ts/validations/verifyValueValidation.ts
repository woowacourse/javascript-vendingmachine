import { Product, Coin, LoginInfo, UserInfo } from '../declarations/resourceDeclaration';
import { CHARGE_MONEY_RULES, INPUT_MONEY_RULES, PRODUCT_RULES } from '../constants';

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
      alert();
      return false;
    }
    if (this.isOverlapProductName(name, index)) {
      alert();
      return false;
    }
    if (!this.isValidProductPrice(price)) {
      alert();
      return false;
    }
    if (!this.isValidProductQuantity(quantity)) {
      alert();
      return false;
    }
    return true;
  }

  verifyChargeMoney(chargeMoney: number) {
    if (!this.isValidChargeMoney(chargeMoney)) {
      alert();
      return false;
    }
    return true;
  }

  verifyInputMoney(inputMoney: number) {
    if (!this.isValidInputMoney(inputMoney)) {
      alert();
      return false;
    }
    return true;
  }

  verifyLoginInfo({ email, password }: LoginInfo) {
    if (!this.isValidEmail(email)) {
      alert();
      return false;
    }
    if (!this.isValidPassWord(password)) {
      alert();
      return false;
    }
    return true;
  }

  verifySignUpInfo({ email, name, password, passwordConfirm }: UserInfo) {
    if (!this.isValidEmail(email)) {
      alert();
      return false;
    }
    if (!this.isValidName(name)) {
      alert();
      return false;
    }
    if (!this.isValidPassWord(password)) {
      alert();
      return false;
    }
    if (!this.isValidPassWordConfirm(password, passwordConfirm)) {
      alert();
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
    return (
      chargeMoney >= CHARGE_MONEY_RULES.MIN &&
      chargeMoney % CHARGE_MONEY_RULES.MOD_UNIT === 0 &&
      this.totalAmount() + chargeMoney <= CHARGE_MONEY_RULES.MAX
    );
  }

  // 상품 구매 금액 충전 검증
  isValidInputMoney(inputMoney: number) {
    return (
      inputMoney >= INPUT_MONEY_RULES.MIN &&
      inputMoney <= INPUT_MONEY_RULES.MAX &&
      inputMoney % INPUT_MONEY_RULES.MOD_UNIT === 0
    );
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
