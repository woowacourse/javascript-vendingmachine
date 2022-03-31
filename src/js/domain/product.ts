import {
  ISingleProduct,
  IGet,
  IGetId,
  IUpdateName,
  IUpdatePrice,
  IUpdateCount,
} from '../interface/product.interface';
import { generateUniqueId } from '../util/general';

class SingleProduct implements ISingleProduct {
  readonly id: string;
  name: string;
  price: number;
  count: number;

  constructor(name: string, price: number, count: number) {
    this.id = generateUniqueId();
    this.name = name;
    this.price = price;
    this.count = count;
  }

  get: IGet = () => {
    return { id: this.id, name: this.name, price: this.price, count: this.count };
  };

  getId: IGetId = () => {
    return this.id;
  };

  updateName: IUpdateName = name => {
    this.name = name;
  };

  updatePrice: IUpdatePrice = price => {
    this.price = price;
  };

  updateCount: IUpdateCount = count => {
    this.count = count;
  };
}

export default SingleProduct;
