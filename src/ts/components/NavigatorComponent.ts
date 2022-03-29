import { $, on } from '../dom';
import { MAIN_PAGE } from '../constants';
import ProductsComponent from './ProductManageComponent/ProductsComponent';
import VendingMachineProductManager from '../domains/VendingMachineProductManager';
import CoinComponent from './CoinManageComponent/CoinComponent';
import VendingMachineCoinManager from '../domains/VendingMachineCoinManager';

export default class NavigatorComponent {
  private $navList = $('.nav__list');

  constructor() {
    new ProductsComponent(new VendingMachineProductManager());
    new CoinComponent(new VendingMachineCoinManager());
    on(this.$navList, 'click', this.onClickTab);
    on(window, 'popstate', this.onPopstate);
    this.onPopstate();
  }

  private onClickTab = (e) => {
    e.preventDefault();
    if (e.target.classList.contains('nav__button')) {
      this.changeTab(e.target.dataset.tab);
      window.history.pushState(null, null, e.target.dataset.tab);
    }
  };

  private changeTab = (targetTab) => {
    const tabs = this.$navList.querySelectorAll('.nav__button');
    Array.from(tabs).forEach((tabElement: HTMLElement) => {
      this.render(targetTab, tabElement.dataset.tab);
    });
  };

  private onPopstate = () => {
    const targetTab = window.location.pathname;
    this.changeTab(targetTab.replace('/', '') || MAIN_PAGE);
  };

  private render(clickedTab: string, tab: string) {
    $(`.nav__${tab}-button`).className =
      tab === clickedTab
        ? `nav__button nav__${tab}-button nav__button--focused`
        : `nav__button nav__${tab}-button`;
    $(`.${tab}-section`).className =
      tab === clickedTab ? `${tab}-section` : `${tab}-section hide`;
  }
}
