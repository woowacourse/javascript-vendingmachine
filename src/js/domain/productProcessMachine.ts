import {
  IProductProcessMachine,
  IUpdate,
  IAdd,
  IDelete,
  IGetProducts,
} from '../interface/productProcessMachine.interface';
import {
  checkDuplicatedName,
  checkNameLength,
  checkValidPrice,
  checkValidCount,
} from '../util/validations';
import SingleProduct from './product';
class ProductProcessMachine implements IProductProcessMachine {
  products = [];

  add: IAdd = ({ name, price, count }) => {
    checkDuplicatedName(this.products, name);
    checkNameLength(name);
    checkValidPrice(price);
    checkValidCount(count);

    const product = new SingleProduct(name, price, count);
    this.products.push(product);
    return product;
  };

  getProducts: IGetProducts = () => {
    return this.products;
  };

  update: IUpdate = (id, name, price, count) => {
    checkDuplicatedName(this.products, name, id);
    checkNameLength(name);
    checkValidPrice(price);
    checkValidCount(count);

    const product = this.products.find(product => {
      return id === product.getId();
    });

    name && product.updateName(name);
    price && product.updatePrice(price);
    count && product.updateCount(count);

    return product;
  };

  delete: IDelete = id => {
    this.products = this.products.filter(product => product.getId() !== id);
  };
}

export default ProductProcessMachine;
