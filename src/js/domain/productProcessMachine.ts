import {
  ProductDomain,
  Update,
  Add,
  Delete,
  GetProducts,
} from "../interface/product.interface";

class ProductProcessMachine implements ProductDomain {
  products = [];

  add: Add = (newProduct) => {
    this.checkDuplicatedName(newProduct.name);
    this.checkNameLength(newProduct.name);
    this.checkValidPrice(newProduct.price);
    this.checkValidCount(newProduct.count);

    this.products.push(newProduct);
  };

  getProducts: GetProducts = () => {
    return this.products;
  };

  update: Update = (idx, name, price, count) => {
    this.checkDuplicatedName(name, idx);
    this.checkNameLength(name);
    this.checkValidPrice(price);
    this.checkValidCount(count);

    name && this.checkNameLength(name);
    price && this.checkValidPrice(price);
    count && this.checkValidCount(count);

    this.updateStatus(idx, name, "name");
    this.updateStatus(idx, price, "price");
    this.updateStatus(idx, count, "count");
  };

  delete: Delete = (idx) => {
    this.products.splice(idx, 1);
  };

  updateStatus = (idx: number, status: number | string, key: string) => {
    this.products[idx][`${key}`] = status
      ? status
      : this.products[idx][`${key}`];
  };

  checkDuplicatedName = (newName: string, idx: number = -1): void => {
    if (
      this.products.some(({ name }, index) => {
        return name === newName && (idx === -1 || index !== idx);
      })
    ) {
      throw new Error("중복된 상품은 입력 할 수 없습니다.");
    }
  };

  checkNameLength = (name: string): void => {
    if (name.length > 10) {
      throw new Error("상품명은 10자이하로 입력해주세요");
    }
  };

  checkValidPrice = (price: number): void => {
    if (price < 100 || price > 10000 || price % 10 !== 0) {
      throw new Error("유효한 가격을 입력해주세요");
    }
  };

  checkValidCount = (count: number): void => {
    if (count <= 0) {
      throw new Error("추가하는 수량은 0이하가 될수가 없습니다.");
    }

    if (count > 20) {
      throw new Error("수량은 최대 20개까지 추가 가능합니다.");
    }
  };
}

export default ProductProcessMachine;
