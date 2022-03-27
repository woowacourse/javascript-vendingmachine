import { TabView, ProductManageView } from '../../index.d';
import { $ } from '../util/index';
import ProductManage from './ProductManage';

export default class Tab implements TabView {
  public readonly $app: HTMLElement;
  public readonly $tabs: HTMLElement;
  public readonly productManage: ProductManageView;

  constructor() {
    this.$app = $('#app');
    this.$tabs = $('#tab');
    this.productManage = new ProductManage();
    this.handlePopstate();
  }

  bindEvent(): void {
    this.productManage.bindEvent();
    this.$tabs.addEventListener('click', this.handleClickTabs.bind(this));
    window.addEventListener('popstate', this.handlePopstate.bind(this));
  }

  handleClickTabs(e: Event): void {
    if (e.target === e.currentTarget) return;

    const tabName = (e.target as HTMLElement).dataset.name;

    history.pushState({}, '', window.location.pathname + `#${tabName}`);
    this.switchTab(tabName);
  }

  handlePopstate(): void {
    if (window.location.hash) {
      this.switchTab(window.location.hash.slice(1));
    }
  }

  switchTab(tabName: string): void {
    this.$app.classList.remove('productManage', 'chargeMoney', 'buyProduct');
    this.$app.classList.add(tabName);
  }
}