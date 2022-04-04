import { $, $$ } from '../dom';
import { MAIN_PAGE } from '../constants';
import { emit, on } from '../events';

const render = (clickedTab: string, tab: string) => {
  $(`.nav__${tab}-button`).className =
    tab === clickedTab
      ? `nav__button nav__${tab}-button nav__button--focused`
      : `nav__button nav__${tab}-button`;
  $(`.${tab}-section`).className =
    tab === clickedTab ? `${tab}-section` : `${tab}-section hide`;
};

export default class NavigatorComponent {
  private $app = $('#app');
  private $navList = $('.nav__list');
  private $tabs = $$('.nav__button');

  constructor() {
    on(this.$navList, 'click', this.onClickTab);
    on(window, 'popstate', this.routeByPath);

    this.routeByPath();
  }

  private onClickTab = (e) => {
    e.preventDefault();
    if (e.target.classList.contains('nav__button')) {
      this.changeTab(e.target.dataset.tab);
      window.history.pushState(null, null, e.target.dataset.tab);
      emit(this.$app, `@${e.target.dataset.tab}TabClicked`);
    }
  };

  private changeTab = (targetTab) => {
    Array.from(this.$tabs).forEach((tabElement: HTMLElement) => {
      render(targetTab, tabElement.dataset.tab);
    });
  };

  private routeByPath = () => {
    const targetTab = window.location.pathname;
    this.changeTab(targetTab.replace('/', '') || MAIN_PAGE);
  };
}
