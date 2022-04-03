import { CHARGE } from "../../utils/constants";
import { CoinType, ProductProps, PurchaseInfoProps, PurchaseProductProps } from "../../utils/interface";
import { validatePossiblePurchaseProduct } from "../../utils/validation";

class PurchaseInfo implements PurchaseInfoProps{
  productList: ProductProps[];
  insertMoney: number;
  coinsKindCount: CoinType;
  returnCoinsKindCount: CoinType;

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

  calulateReturnCharge(returnCharge: number) {
    this.returnCoinsKindCount = { 10: 0, 50: 0, 100: 0, 500: 0 };
    this.coinsKindCount = this.getCoinList();

    while(returnCharge !== 0) {
      if (returnCharge >= 500 && this.coinsKindCount[500] > 0) {
        returnCharge -= 500;
        this.coinsKindCount[500] -= 1;
        this.returnCoinsKindCount[500] += 1;
      } else if (returnCharge >= 100 && this.coinsKindCount[100] > 0) {
        returnCharge -= 100;
        this.coinsKindCount[100] -= 1;
        this.returnCoinsKindCount[100] += 1;
      } else if (returnCharge >= 50 && this.coinsKindCount[50] > 0) {
        returnCharge -= 50;
        this.coinsKindCount[50] -= 1;
        this.returnCoinsKindCount[50] += 1;
      } else if (returnCharge >= 10) { 
        if (this.coinsKindCount[10] > 0) {
          returnCharge -= 10;
          this.coinsKindCount[10] -= 1;
          this.returnCoinsKindCount[10] += 1;
        } else if (this.coinsKindCount[10] === 0) {
          break;
        }
      }
    }
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
