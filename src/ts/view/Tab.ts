import { View, DomainView, PageName } from '../../index.d';
import { $ } from '../util/index';
import ProductManage from './ProductManage';
import ChargeMoney from './ChargeMoney';
import BuyProduct from './BuyProduct';
import Snackbar from './Snackbar';

export default class Tab implements View {
  private $app: HTMLElement;
  private $tabs: HTMLElement;
  private productManage: DomainView;
  private chargeMoney: DomainView;
  private buyProduct: DomainView;

  constructor() {
    this.$app = $('#app');
    this.$tabs = $('#tab');

    const snackbar = new Snackbar();
    this.productManage = new ProductManage(snackbar);
    this.chargeMoney = new ChargeMoney(snackbar);
    this.buyProduct = new BuyProduct(snackbar);
    
    this.handlePopstate();
  }

  bindEvent(): void {
    this.productManage.bindEvent();
    this.chargeMoney.bindEvent();
    this.buyProduct.bindEvent();
    this.$tabs.addEventListener('click', this.handleClickTabs.bind(this));
    window.addEventListener('popstate', this.handlePopstate.bind(this));
  }

  private handleClickTabs(e: Event): void {
    if (e.target === e.currentTarget) return;

    const pageName = (e.target as HTMLElement).dataset.name as unknown as PageName;

    if (this.$app.classList.contains(pageName)) return;

    history.pushState({}, '', window.location.pathname + `#${pageName}`);
    this.switchTab(pageName);
  }

  private handlePopstate(): void {
    if (window.location.hash) {
      this.switchTab(window.location.hash.slice(1) as unknown as PageName);
    }
  }

  private switchTab(pageName: PageName): void {
    this.$app.classList.remove('productManage', 'chargeMoney', 'buyProduct');
    this.$app.classList.add(pageName);
    this[pageName].render();
  }
}
