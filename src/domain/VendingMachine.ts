import VendingMachineProduct from './VendingMachineProduct';
import { ERROR_MESSAGE } from '../constants';
import { generateUniqueId } from '../utils';

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

  constructor() {
    this._productList = {};
  }

  get productList(): VendingMachineProductDictionary {
    return this._productList;
  }

  private validateUniqueProductName(name): never | void {
    if (
      Object.values(this._productList).some((product) => product.name === name)
    ) {
      throw new Error(ERROR_MESSAGE.DUPLICATE_PRODUCT_NAME);
    }
  }

  private validateProductIdInList(productId: string) {
    if (this._productList[productId] === undefined) {
      throw new Error(ERROR_MESSAGE.NOT_FOUND_PRODUCT_ID);
    }
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

  removeProduct(productId: string) {
    this.validateProductIdInList(productId);
    delete this._productList[productId];
  }
}
