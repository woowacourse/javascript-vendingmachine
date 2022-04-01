import ProductManagement from '../domain/ProductManagement';
import CoinManagement from '../domain/CoinManagement';
import { $, $$ } from '../utils/dom';
import CoinManagementComponent from './CoinManagementComponent';
import ProductManagementComponent from './ProductManagementComponent';
import ProductPurchaseComponent from './ProductPurchaseComponent';
import MoneyManagement from '../domain/MoneyManagement';

const basePath =
  process.env.NODE_ENV === 'production' ? '/javascript-vendingmachine' : '';

export default class App {
  private productManagement;
  private coinManagement;
  private moneyManagement;
  private productManagementComponent;
  private coinManagementComponent;
  private productPurchaseComponent;

  constructor() {
    this.productManagement = new ProductManagement();
    this.coinManagement = new CoinManagement();
    this.moneyManagement = new MoneyManagement();

    this.productManagementComponent = new ProductManagementComponent(
      this.productManagement,
    );
    this.coinManagementComponent = new CoinManagementComponent(
      this.coinManagement,
    );
    this.productPurchaseComponent = new ProductPurchaseComponent(
      this.moneyManagement,
    );

    this.productManagementComponent.render();

    $('.nav').addEventListener('click', this.navClickHandler);
    window.addEventListener('popstate', this.popStateHandler);
  }

  private navClickHandler = ({ target }) => {
    if (target.tagName !== 'BUTTON') return;

    const pathname = `${basePath}${target.dataset.pathname}`;

    history.pushState({}, '', pathname || '/');

    this.activateClickedButton(pathname);
    this.renderMainContent(pathname);
  };

  private popStateHandler = () => {
    this.activateClickedButton(location.pathname);
    this.renderMainContent(location.pathname);
  };

  private activateClickedButton(pathname) {
    $$('.nav__button').forEach($button => {
      if (
        this.checkMatchPathname(
          $button.dataset.pathname,
          pathname.replace(basePath, ''),
        )
      ) {
        $button.classList.add('active');
        return;
      }
      $button.classList.remove('active');
    });
  }

  private checkMatchPathname(buttonPathname, pathname) {
    return buttonPathname === pathname;
  }

  private renderMainContent(pathname) {
    switch (pathname) {
      case `${basePath}/`:
        this.productManagementComponent.render();
        break;
      case `${basePath}/charge`:
        this.coinManagementComponent.render();
        break;
      case `${basePath}/purchase`:
        this.productPurchaseComponent.render();
    }
  }
}
