import { Router } from './utils/Router';
import { HomeView } from './view/HomeView';
import { ProductManageView } from './view/ProductManageView';
import { BalanceChargeView } from './view/BalanceChargeView';
import { ProductPurchaseView } from './view/productPurchaseView';
import { CoinVault } from './domain/CoinVault';
import { ProductCatalog } from './domain/ProductCatalog';

export class App {
  contentsContainer: HTMLDivElement;
  coinVault: CoinVault;
  productCatalog: ProductCatalog;
  homeView: HomeView;
  productManageView: ProductManageView;
  balanceChargeView: BalanceChargeView;
  productPurchaseView: ProductPurchaseView;
  router: Router;

  constructor() {
    this.contentsContainer = document.querySelector('#contents-container');
    this.coinVault = new CoinVault();
    this.productCatalog = new ProductCatalog();

    const props = {
      contentsContainer: this.contentsContainer,
      coinVault: this.coinVault,
      productCatalog: this.productCatalog,
    };

    this.homeView = new HomeView(props);
    this.productManageView = new ProductManageView(props);
    this.balanceChargeView = new BalanceChargeView(props);
    this.productPurchaseView = new ProductPurchaseView(props);

    this.router = new Router(this);

    this.contentsContainer.addEventListener('productManageTabClick', (e: Event) => {
      this.router.pushHistory(e);
    });
    this.contentsContainer.addEventListener('balanceChargeTabClick', (e: Event) => {
      this.router.pushHistory(e);
    });
    this.contentsContainer.addEventListener('productPurchaseTabClick', (e: Event) => {
      this.router.pushHistory(e);
    });
  }
}
