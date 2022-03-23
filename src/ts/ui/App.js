import ProductManagementDomain from '../domain/ProductManagement';
import { $, $$ } from '../utils/dom';
import CoinChargeUI from './CoinChargeUI';
import ProductManagementUI from './ProductManagementUI';
import ProductPurchaseUI from './ProductPurchase';

export default class App {
  constructor() {
    this.productDomain = new ProductManagementDomain();
    this.productManagementUI = new ProductManagementUI(this.productDomain);
    this.coinChargeUI = new CoinChargeUI(this.productDomain);
    this.productPurchaseUI = new ProductPurchaseUI(this.productDomain);

    this.productManagementUI.render();

    this.addNavClickEvent();
    this.addPopStateEvent();
  }

  addPopStateEvent() {
    window.addEventListener('popstate', () => {
      this.activateClickedButton(location.pathname);
      switch (location.pathname) {
        case '/':
          this.productManagementUI.render();
          break;
        case '/charge':
          this.coinChargeUI.render();
          break;
        case '/purchase':
          this.productPurchaseUI.render();
      }
    });
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

  addNavClickEvent() {
    $('.nav').addEventListener('click', ({ target }) => {
      if (target.tagName !== 'BUTTON') return;

      this.activateClickedButton(target.dataset.pathname);
      history.pushState({}, '', target.dataset.pathname);
      switch (target.dataset.pathname) {
        case '/':
          this.productManagementUI.render();
          break;

        case '/charge':
          this.coinChargeUI.render();
          break;

        case '/purchase':
          this.productPurchaseUI.render();
      }
    });
  }
}
