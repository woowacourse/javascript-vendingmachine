import ProductManagement from '../domain/ProductManagement';
import CoinManagement from '../domain/CoinManagement';
import { $, $$ } from '../utils/dom';
import CoinManagementComponent from './CoinManagementComponent';
import ProductManagementComponent from './ProductManagementComponent';
import ProductPurchaseComponent from './ProductPurchaseComponent';
import MoneyManagement from '../domain/MoneyManagement';
import SignupComponent from './SignupComponent';
import LoginComponent from './LoginComponent';

export const basePath =
  process.env.NODE_ENV === 'production' ? '/javascript-vendingmachine' : '';

export default class App {
  private readonly loginComponent: LoginComponent;

  constructor(
    private readonly productManagement = new ProductManagement(),
    private readonly coinManagement = new CoinManagement(),
    private readonly moneyManagement = new MoneyManagement(),
    private readonly productManagementComponent = new ProductManagementComponent(
      productManagement,
    ),
    private readonly coinManagementComponent = new CoinManagementComponent(
      coinManagement,
    ),
    private readonly productPurchaseComponent = new ProductPurchaseComponent(
      productManagement,
      coinManagement,
      moneyManagement,
    ),
    private readonly signupComponent = new SignupComponent(),
  ) {
    this.productManagementComponent.render();
    this.loginComponent = new LoginComponent(this.renderMainContent);

    console.log('signupComponent', this.signupComponent);
    console.log('loginComponent', this.loginComponent);

    $('.nav').addEventListener('click', this.navClickHandler);
    $('.login-button').addEventListener('click', this.loginButtonHandler);
    window.addEventListener('popstate', this.popStateHandler);

    this.loginComponent.render();
  }

  private loginButtonHandler = e => {
    if (!(e.target instanceof HTMLButtonElement)) return;
    const pathname = `${basePath}${e.target.dataset.pathname}`;

    history.pushState({}, '', pathname || '/');

    this.renderMainContent(pathname);
  };

  private navClickHandler = ({ target }) => {
    if (target.tagName !== 'BUTTON') return;

    const pathname = `${basePath}${target.dataset.pathname}`;

    history.pushState({}, '', pathname || '/');

    this.activateClickedButton(pathname);
    this.renderMainContent(pathname);
  };

  private popStateHandler = () => {
    if (location.pathname === `${basePath}/`) {
      this.activateClickedButton(location.pathname);
    }
    console.log('location.pathname', location.pathname);
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

  renderMainContent = pathname => {
    switch (pathname) {
      case `${basePath}/`:
        this.productManagementComponent.render();
        break;
      case `${basePath}/charge`:
        this.coinManagementComponent.render();
        break;
      case `${basePath}/purchase`:
        this.productPurchaseComponent.render();
        break;
      case `${basePath}/login`:
        this.loginComponent.render();
        break;
      case `${basePath}/signup`:
        this.signupComponent.render();
    }
  };
}
