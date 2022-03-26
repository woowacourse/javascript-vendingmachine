import ProductManagementDomain from '../domain/ProductManagement';
import CoinManagementDomain from '../domain/CoinManagement';
import { $, $$ } from '../utils/dom';
import CoinManagementUI from './CoinManagementUI';
import ProductManagementUI from './ProductManagementUI';
import ProductPurchaseUI from './ProductPurchase';

const basePath =
  process.env.NODE_ENV === 'production' ? '/javascript-vendingmachine' : '';

export default class App {
  private productDomain;
  private coinDomain;
  private productManagementUI;
  private coinManagementUI;
  private productPurchaseUI;

  constructor() {
    this.productDomain = new ProductManagementDomain();
    this.coinDomain = new CoinManagementDomain();

    this.productManagementUI = new ProductManagementUI(this.productDomain);
    this.coinManagementUI = new CoinManagementUI(this.coinDomain);
    this.productPurchaseUI = new ProductPurchaseUI();

    this.productManagementUI.render();

    $('.nav').addEventListener('click', this.navClickHandler);
    window.addEventListener('popstate', this.popStateHandler);
  }

  private navClickHandler = ({ target }) => {
    if (target.tagName !== 'BUTTON') return;

    history.pushState({}, '', `${basePath}${target.dataset.pathname}`);

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
