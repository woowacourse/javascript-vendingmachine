import { View, DomainView } from '../../index.d';
import { $ } from '../util/index';
import ProductManage from './ProductManage';
import ChargeMoney from './ChargeMoney';

export default class Tab implements View {
  private $app: HTMLElement;
  private $tabs: HTMLElement;
  private productManage: DomainView;
  private chargeMoney: DomainView;

  constructor() {
    this.$app = $('#app');
    this.$tabs = $('#tab');
    this.productManage = new ProductManage();
    this.chargeMoney = new ChargeMoney();
    this.handlePopstate();
  }

  bindEvent(): void {
    this.productManage.bindEvent();
    this.chargeMoney.bindEvent();
    this.$tabs.addEventListener('click', this.handleClickTabs.bind(this));
    window.addEventListener('popstate', this.handlePopstate.bind(this));
  }

  private handleClickTabs(e: Event): void {
    if (e.target === e.currentTarget) return;

    const tabName = (e.target as HTMLElement).dataset.name;

    history.pushState({}, '', window.location.pathname + `#${tabName}`);
    this.switchTab(tabName);
  }

  private handlePopstate(): void {
    if (window.location.hash) {
      this.switchTab(window.location.hash.slice(1));
    }
  }

  private switchTab(tabName: string): void {
    this.$app.classList.remove('productManage', 'chargeMoney', 'buyProduct');
    this.$app.classList.add(tabName);
    this[tabName].render();
  }
}
