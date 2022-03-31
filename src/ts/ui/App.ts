import ProductManagementDomain from '../domain/ProductManagementDomain/ProductManagement';
import CoinManagementDomain from '../domain/CoinManagementDomain/CoinManagement';
import PurchaseCashDomain from '../domain/PurchaseCashDomain/PurchaseCash';
import { $, $$ } from '../utils/dom';
import CoinManagementUI from './CoinManagementUI';
import ProductManagementUI from './ProductManagementUI';
import ProductPurchaseUI from './ProductPurchaseUI';

export default class App {
  constructor(
    private readonly productDomain = new ProductManagementDomain(),
    private readonly coinDomain = new CoinManagementDomain(),
    private readonly purchaseCashDomain = new PurchaseCashDomain(),
    private readonly productManagementUI = new ProductManagementUI(
      productDomain,
    ),
    private readonly coinManagementUI = new CoinManagementUI(coinDomain),
    private readonly productPurchaseUI = new ProductPurchaseUI(
      purchaseCashDomain,
    ),
  ) {
    this.productManagementUI.render();

    $('.nav').addEventListener('click', this.navClickHandler);
    window.addEventListener('popstate', this.popStateHandler);
  }

  private navClickHandler = ({ target }) => {
    if (target.tagName !== 'BUTTON') return;

    const basePath =
      process.env.NODE_ENV === 'production' ? '/javascript-vendingmachine' : '';
    const pathname = `${basePath}${target.dataset.pathname}`;

    if (pathname === location.pathname) return;

    history.pushState({}, '', pathname);

    this.activateClickedButton(target.dataset.pathname);
    this.renderMainContent(target.dataset.pathname);
  };

  private popStateHandler = () => {
    const paths = location.pathname.split('/');
    const pathname = `/${paths[paths.length - 1]}`;
    this.activateClickedButton(pathname);
    this.renderMainContent(pathname);
  };

  private activateClickedButton(pathname) {
    $$('.nav__button').forEach($button => {
      if ($button.dataset.pathname === pathname) {
        $button.classList.add('active');
        return;
      }
      $button.classList.remove('active');
    });
  }

  private renderMainContent(pathname) {
    switch (pathname) {
      case '/':
        this.productManagementUI.render();
        break;
      case '/charge':
        this.coinManagementUI.render();
        break;
      case '/purchase':
        this.productPurchaseUI.render();
    }
  }
}
