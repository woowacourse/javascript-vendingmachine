import ProductManagementDomain from '../domain/ProductManagement';
import CoinManagementDomain from '../domain/CoinManagement';
import { $, $$ } from '../utils/dom';
import CoinManagementComponent from './CoinManagementComponent';
import ProductManagementComponent from './ProductManagementComponent';
import ProductPurchaseComponent from './ProductPurchaseComponent';

const basePath =
  process.env.NODE_ENV === 'production' ? '/javascript-vendingmachine' : '';

export default class App {
  private productDomain;
  private coinDomain;
  private productManagementComponent;
  private coinManagementComponent;
  private productPurchaseComponent;

  constructor() {
    this.productDomain = new ProductManagementDomain();
    this.coinDomain = new CoinManagementDomain();

    this.productManagementComponent = new ProductManagementComponent(
      this.productDomain,
    );
    this.coinManagementComponent = new CoinManagementComponent(this.coinDomain);
    this.productPurchaseComponent = new ProductPurchaseComponent();

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
