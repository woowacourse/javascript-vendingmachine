import ProductManagementDomain from '../domain/ProductManagement';
import CoinManagementDomain from '../domain/CoinManagement';
import { $, $$ } from '../utils/dom';
import CoinManagementUI from './CoinManagementUI';
import ProductManagementUI from './ProductManagementUI';
import ProductPurchaseUI from './ProductPurchase';

export default class App {
  productDomain;
  coinDomain;
  productManagementUI;
  coinManagementUI;
  productPurchaseUI;

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

  navClickHandler = ({ target }) => {
    if (target.tagName !== 'BUTTON') return;

    history.pushState({}, '', target.dataset.pathname);

    this.activateClickedButton(target.dataset.pathname);
    this.renderMainContent(target.dataset.pathname);
  };

  popStateHandler = () => {
    this.activateClickedButton(location.pathname);
    this.renderMainContent(location.pathname);
  };

  renderMainContent(pathname) {
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

  activateClickedButton(pathname) {
    $$('.nav__button').forEach($button => {
      if ($button.dataset.pathname === pathname) {
        $button.classList.add('active');
        return;
      }
      $button.classList.remove('active');
    });
  }
}
