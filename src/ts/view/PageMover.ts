import { View, DomainView, PageName, PageView } from '../../index.d';
import { $ } from '../util/index';
import ProductManage from './ProductManage';
import ChargeMoney from './ChargeMoney';
import BuyProduct from './BuyProduct';
import Snackbar from './Snackbar';
import SignupPage from './SignupPage';

export default class PageMover implements View {
  private $app: HTMLElement;
  private productManage: DomainView;
  private chargeMoney: DomainView;
  private buyProduct: DomainView;
  private signup: PageView;

  constructor() {
    this.$app = $('#app');
    const snackbar = new Snackbar();
    this.productManage = new ProductManage(snackbar);
    this.chargeMoney = new ChargeMoney(snackbar);
    this.buyProduct = new BuyProduct(snackbar);
    this.signup = new SignupPage(snackbar);
    
    this.handlePopstate();
  }

  bindEvent(): void {
    this.productManage.bindEvent();
    this.chargeMoney.bindEvent();
    this.buyProduct.bindEvent();
    this.signup.bindEvent(this.moveBuyProduct.bind(this));
    this.$app.addEventListener('click', this.handleClickPageMoveButtons.bind(this));
    window.addEventListener('popstate', this.handlePopstate.bind(this));
  }

  private handleClickPageMoveButtons(e: Event): void {
    const pageName = (e.target as HTMLElement).dataset.name as unknown as PageName;

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
    this.$app.classList.remove('productManage', 'chargeMoney', 'buyProduct', 'signup');
    this.$app.classList.add(pageName);
    const render = (this[pageName] as DomainView).render;
    render && render.call(this[pageName]);
  }

  private moveBuyProduct(): void {
    this.movePage('buyProduct');
  }
}
