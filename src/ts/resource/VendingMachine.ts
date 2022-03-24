import ProductManageImpl from '../tab/ProductManageImpl';
import ChargeMoneyImpl from '../tab/ChargeMoneyImpl';
import { Product, Coin } from './declaration';
import { $ } from '../util/dom';

class VendingMachine {
  private products: Array<Product> = []; 
  private coins: Array<Coin> = [{ amount:10, count: 0 }, { amount:50, count: 0 }, { amount:100, count: 0 }, { amount:500, count: 0 }];

  constructor() {
    new ProductManageImpl(this.products);
    new ChargeMoneyImpl(this.coins);
    $('#tab').addEventListener('click', this.handleClickTabButtons.bind(this));
    window.addEventListener('popstate', this.handlePopstate.bind(this));
  }

  handleClickTabButtons(e) {
    if (e.target === e.currentTarget) {
      return;
    };

    const tabName = e.target.dataset.name;

    history.pushState({}, '', window.location.pathname + `#${tabName}`);
    this.switchTab(tabName);
  }

  handlePopstate() {
    if (window.location.hash) {
      this.switchTab(window.location.hash.slice(1));
    }
  }

  switchTab(tabName) {
    $('#app').classList.remove('manage', 'charge', 'buy');
    $('#app').classList.add(tabName);
  }
}

export default VendingMachine;
