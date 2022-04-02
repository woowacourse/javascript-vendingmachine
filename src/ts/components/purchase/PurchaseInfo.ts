import { PurchaseInfoProps } from "../../utils/interface";

class PurchaseInfo implements PurchaseInfoProps{
  insertMoney: number;

  constructor() {
    this.insertMoney = this.getInsertMoney();
  }

  returnCharge() {
  
  }

  purchaseProduct() {
  
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
}

export default PurchaseInfo;
