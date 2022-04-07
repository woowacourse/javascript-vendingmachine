import { View, DomainView, PageName, PageView, Admin } from '../../index.d';
import { $ } from '../util/index';
import ProductManage from './ProductManage';
import ChargeMoney from './ChargeMoney';
import BuyProduct from './BuyProduct';
import Snackbar from './Snackbar';
import SignupPage from './SignupPage';
import LoginPage from './LoginPage';
import AdminImpl from '../interactor/AdminImpl';
import AdminPage from './AdminPage';

export default class PageMover implements View {
  private $app: HTMLElement;
  private $mainPage: HTMLElement;
  private $thubnail: HTMLElement;
  private $logoutMenu: HTMLElement;
  private snackbar: Snackbar;
  private productManage: DomainView;
  private chargeMoney: DomainView;
  private buyProduct: DomainView;
  private signupPage: PageView;
  private loginPage: PageView;
  private adminPage: PageView;
  private admin: Admin;

  constructor() {
    this.$app = $('#app');
    this.$mainPage = $('#main-page');
    this.$thubnail = $('#thumbnail');
    this.$logoutMenu = $('#logout-menu');
    this.snackbar = new Snackbar();
    this.productManage = new ProductManage(this.snackbar);
    this.chargeMoney = new ChargeMoney(this.snackbar);
    this.buyProduct = new BuyProduct(this.snackbar);
    this.signupPage = new SignupPage(this.snackbar);
    this.loginPage = new LoginPage(this.snackbar);
    this.adminPage = new AdminPage(this.snackbar);
    this.admin = AdminImpl.getInstance();

    this.handlePopstate();
  }

  bindEvent(): void {
    this.productManage.bindEvent();
    this.chargeMoney.bindEvent();
    this.buyProduct.bindEvent();
    this.signupPage.bindEvent(() => this.movePage('loginPage'));
    this.loginPage.bindEvent(() => this.movePage('buyProduct'));
    this.adminPage.bindEvent(() => this.movePage('buyProduct'));
    this.$app.addEventListener('click', this.handleClickPageMoveButtons.bind(this));
    this.$thubnail.addEventListener('click', () => this.controllMainPage('menu'));
    this.$logoutMenu.addEventListener('click', this.handleClickLogoutMenu.bind(this));
    window.addEventListener('popstate', this.handlePopstate.bind(this));
  }

  private handleClickPageMoveButtons(e: Event): void {
    const pageName = (e.target as HTMLElement).dataset.page as unknown as PageName;

    if (!pageName || this.$app.classList.contains(pageName)) return;

    history.pushState({}, '', window.location.pathname + `#${pageName}`);
    this.movePage(pageName);
  }

  private handleClickLogoutMenu(): void {
    try {
      this.admin.logout();
      this.movePage('buyProduct');
      this.controllMainPage('buyer');
    } catch ({ message }) {
      this.snackbar.on(message);
    }
  }

  private handlePopstate(): void {
    if (window.location.hash) {
      this.movePage(window.location.hash.slice(1) as unknown as PageName);
    }
  }

  private movePage(pageName: PageName): void {
    this.$app.classList.remove('productManage', 'chargeMoney', 'buyProduct', 'signupPage', 'adminPage', 'loginPage');
    this.$app.classList.add(pageName);
    this[pageName].render.call(this[pageName]);
    this.controllSignStatus();
  }

  private controllSignStatus() {
    if (this.admin.isLogin()) {
      this.controllMainPage('admin');
      this.$thubnail.innerText = this.admin.adminName[0];
    } else {
      this.controllMainPage('buyer')
    }
  }

  private controllMainPage(screen: string): void {
    this.$mainPage.classList.remove('buyer', 'admin', 'menu');
    this.$mainPage.classList.add(screen);
  }
}
