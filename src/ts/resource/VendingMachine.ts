import { Product, Coin } from './declaration';
import ProductManageImpl from '../tab/ProductManageImpl';
import ChargeMoneyImpl from '../tab/ChargeMoneyImpl';

class VendingMachine {
  private products: Array<Product> = []; 
  private coins: Array<Coin> = [{ amount:10, count: 0 }, { amount:50, count: 0 }, { amount:100, count: 0 }, { amount:500, count: 0 }];

  constructor() {
    new ProductManageImpl(this.products);
    new ChargeMoneyImpl(this.coins);
  }
}

export default VendingMachine;
