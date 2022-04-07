import { View, DomainView, PageName, PageView, Admin } from '../../index.d';
import { $ } from '../util/index';
import ProductManage from './ProductManage';
import ChargeMoney from './ChargeMoney';
import BuyProduct from './BuyProduct';
import Snackbar from './Snackbar';
import SignupPage from './SignupPage';
import LoginPage from './LoginPage';
import AdminImpl from '../interactor/AdminImpl';

export default class PageMover implements View {
  private $app: HTMLElement;
  private $signWrap: HTMLElement;
  private $thubnail: HTMLElement;
  private productManage: DomainView;
  private chargeMoney: DomainView;
  private buyProduct: DomainView;
  private signupPage: PageView;
  private loginPage: PageView;
  private admin: Admin;

  constructor() {
    this.$app = $('#app');
    this.$signWrap = $('#sign-wrap');
    this.$thubnail = $('#thumbnail');
    const snackbar = new Snackbar();
    this.productManage = new ProductManage(snackbar);
    this.chargeMoney = new ChargeMoney(snackbar);
    this.buyProduct = new BuyProduct(snackbar);
    this.signupPage = new SignupPage(snackbar);
    this.loginPage = new LoginPage(snackbar);
    this.admin = AdminImpl.getInstance();

    this.handlePopstate();
  }

  bindEvent(): void {
    this.productManage.bindEvent();
    this.chargeMoney.bindEvent();
    this.buyProduct.bindEvent();
    this.signupPage.bindEvent(() => this.movePage('loginPage'));
    this.loginPage.bindEvent(() => this.movePage('buyProduct'));
    this.$app.addEventListener('click', this.handleClickPageMoveButtons.bind(this));
    this.$thubnail.addEventListener('click', () => this.controllSignWrap('menu'));
    window.addEventListener('popstate', this.handlePopstate.bind(this));
  }

  private handleClickPageMoveButtons(e: Event): void {
    const pageName = (e.target as HTMLElement).dataset.page as unknown as PageName;

    if (!pageName || this.$app.classList.contains(pageName)) return;

    history.pushState({}, '', window.location.pathname + `#${pageName}`);
    this.movePage(pageName);
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
      this.controllSignWrap('admin');
      this.$thubnail.innerText = this.admin.adminName[0];
    } else {
      this.controllSignWrap('buyer')
    }
  }

  private controllSignWrap(screen: string): void {
    this.$signWrap.classList.remove('buyer', 'admin', 'menu');
    this.$signWrap.classList.add(screen);
  }
}
