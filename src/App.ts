import { Router } from './utils/Router';
import { HomeView } from './view/HomeView';
import { ProductManageView } from './view/ProductManageView';
import { BalanceChargeView } from './view/BalanceChargeView';

export class App {
  contentsContainer: HTMLDivElement;
  router: Router;
  homeView: HomeView;
  productManageView: ProductManageView;
  balanceChargeView: BalanceChargeView;

  constructor() {
    this.homeView = new HomeView();
    this.productManageView = new ProductManageView();
    this.balanceChargeView = new BalanceChargeView();
    this.router = new Router(this);

    this.contentsContainer = document.querySelector('#contents-container');
    this.contentsContainer.addEventListener('productManageTabClick', (e: Event) => {
      this.router.pushHistory(e);
    });
    this.contentsContainer.addEventListener('balanceChargeTabClick', (e: Event) => {
      this.router.pushHistory(e);
    });
  }
}
