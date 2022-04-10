import { CHARGE } from "../../utils/constants";
import { CoinsType, CoinType, ProductProps, PurchaseInfoProps, PurchaseProductProps } from "../../utils/interface";
import { validatePossiblePurchaseProduct } from "../../utils/validation";

class PurchaseInfo implements PurchaseInfoProps{
  productList: ProductProps[];
  insertMoney: number;
  coinsKindCount: CoinType;
  returnCoinsKindCount: CoinType;
  insertMoneyOnlyCoin: number;

  constructor() {
    this.updateProductList();
    this.insertMoney = this.getInsertMoney();
  }

  returnCharge() {
    if (this.insertMoney % CHARGE.RETURN_CHARGE_UNIT === 0) {
      throw new Error("지폐는 잔돈으로 반환할 수 없습니다.");
    }

    this.calulateReturnCharge(this.insertMoney % CHARGE.RETURN_CHARGE_UNIT);
    this.insertMoney -= this.insertMoney % CHARGE.RETURN_CHARGE_UNIT;
    this.setInsertMoney();
    this.setCoinList();
  }

  calulateReturnCharge(insertMoneyOnlyCoin: number) {
    this.returnCoinsKindCount = { 10: 0, 50: 0, 100: 0, 500: 0 };
    this.coinsKindCount = this.getCoinList();
    this.insertMoneyOnlyCoin = insertMoneyOnlyCoin;

    while(this.insertMoneyOnlyCoin !== 0) {
      if (this.insertMoneyOnlyCoin >= 500 && this.coinsKindCount[500] > 0) {
        this.operationDependCoinKind(500);
      } else if (this.insertMoneyOnlyCoin >= 100 && this.coinsKindCount[100] > 0) {
        this.operationDependCoinKind(100);
      } else if (this.insertMoneyOnlyCoin >= 50 && this.coinsKindCount[50] > 0) {
        this.operationDependCoinKind(50);
      } else if (this.insertMoneyOnlyCoin >= 10 && this.coinsKindCount[10] > 0) { 
        this.operationDependCoinKind(10);
      }
      if (this.insertMoneyOnlyCoin >= 10 && this.coinsKindCount[10] === 0) {
        break;
      }
    }
  }

  operationDependCoinKind(coinKind : CoinsType) {
    this.insertMoneyOnlyCoin -= coinKind;
    this.coinsKindCount[coinKind] -= 1;
    this.returnCoinsKindCount[coinKind] += 1;
  }

  updateProductList() {
    this.productList = this.getProductList();
  }

  purchaseProduct({ productName, productPrice }: PurchaseProductProps) {
    validatePossiblePurchaseProduct({ totalMoney: this.insertMoney, productPrice: productPrice });
    this.productList.find((product) => product.productName === productName).productQuantity -= 1;
    this.insertMoney -= productPrice;
    this.setProductList();
    this.setInsertMoney();
  }

  plusInsertMoney(money: number) {
    this.insertMoney += money;
    this.setInsertMoney();
  }

  setInsertMoney() {
    localStorage.setItem("INSERT_MONEY", JSON.stringify(this.insertMoney))
  }

  getInsertMoney() {
    return JSON.parse(localStorage.getItem("INSERT_MONEY")) || 0;
  }

  setProductList() {
    localStorage.setItem("PRODUCTS", JSON.stringify(this.productList));
  }

  getProductList() {
    return JSON.parse(localStorage.getItem("PRODUCTS")) || [];
  }

  setCoinList() {
    localStorage.setItem("COIN_LIST", JSON.stringify(this.coinsKindCount));
  }

  getCoinList() {
    return JSON.parse(localStorage.getItem("COIN_LIST")) || { 10: 0, 50: 0, 100: 0, 500: 0 };
  }
}

export default PurchaseInfo;
