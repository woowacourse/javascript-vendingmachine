import VendingMachineProduct from './VendingMachineProduct';
import { ERROR_MESSAGE, VENDING_MACHINE_RULES } from '../constants';
import { generateUniqueId } from '../utils';
import MoneyBox from './MoneyBox';

interface ProductData {
  name: string;
  price: number;
  stock: number;
}

interface VendingMachineProductDictionary {
  [id: string]: VendingMachineProduct;
}

export default class VendingMachine {
  private _productList: VendingMachineProductDictionary;

  private _moneyBox: MoneyBox;

  constructor() {
    this._productList = {};
    this._moneyBox = new MoneyBox();
  }

  get productList(): VendingMachineProductDictionary {
    return this._productList;
  }

  get totalChange(): number {
    return this._moneyBox.totalAmount;
  }

  addChange(money: number): never | void {
    if (money <= 0) {
      throw new Error(ERROR_MESSAGE.BELOW_MIN_CHANGE);
    }

    if (money % VENDING_MACHINE_RULES.CHANGE_UNIT !== 0) {
      throw new Error(ERROR_MESSAGE.INVALID_UNIT_CHANGE);
    }

    if (this.totalChange + money > VENDING_MACHINE_RULES.MAX_TOTAL_CHANGE) {
      throw new Error(ERROR_MESSAGE.EXCEED_MAX_TOTAL_CHANGE);
    }

    this._moneyBox.charge(money);
  }

  addProduct(data: ProductData): never | string {
    this.validateUniqueProductName(data.name);

    const newId = generateUniqueId(Object.keys(this._productList));
    this._productList[newId] = new VendingMachineProduct(data);

    return newId;
  }

  updateProduct(productId: string, data: ProductData): void {
    this.validateProductIdInList(productId);
    if (data.name !== this._productList[productId].name) {
      this.validateUniqueProductName(data.name);
    }

    this._productList[productId].modify(data);
  }

  private validateUniqueProductName(name): never | void {
    if (
      Object.values(this._productList).some((product) => product.name === name)
    ) {
      throw new Error(ERROR_MESSAGE.DUPLICATE_PRODUCT_NAME);
    }
  }

  removeProduct(productId: string): void {
    this.validateProductIdInList(productId);
    delete this._productList[productId];
  }

  private validateProductIdInList(productId: string): never | void {
    if (this._productList[productId] === undefined) {
      throw new Error(ERROR_MESSAGE.NOT_FOUND_PRODUCT_ID);
    }
  }
}
