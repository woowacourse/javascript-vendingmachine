import { Product, Coin, LoginInfo, UserInfo } from './resourceDeclaration';

export interface VerifyValueValidation {
  // 검증 및 스낵바 호출
  verifyProductInfo({ name, price, quantity }: Product, index: number): boolean;
  verifyChargeMoney(chargeMoney: number): boolean;
  verifyInputMoney(inputMoney: number): boolean;
  verifyLoginInfo({ email, password }: LoginInfo): boolean;
  verifySignUpInfo({ email, name, password, passwordConfirm }: UserInfo): boolean;

  // 상품 정보 검증
  isValidProductNameRange(name: string): boolean;
  isOverlapProductName(name: string, index: number): boolean;
  isValidProductPrice(price: number): boolean;
  isValidProductQuantity(quantity: number): boolean;

  // 자판기 동전 충전 검증
  isValidChargeMoneyRange(chargeMoney: number): boolean;
  isValidChargeMoneyOver(chargeMoney: number): boolean;

  // 상품 구매 금액 충전 검증
  isValidInputMoneyRange(inputMoney: number): boolean;
  isValidInputMoneyMod(inputMoney: number): boolean;

  // 유저 정보 검증
  isValidName(name): boolean;
  isValidEmail(email): boolean;
  isValidPassWord(password): boolean;
  isValidPassWordConfirm(password, passwordConfirm): boolean;

  // 검증 보조 함수
  canBuyProduct({ price, quantity }: Product, totalMoney: number): boolean;
  totalAmount(): Coin;
}
