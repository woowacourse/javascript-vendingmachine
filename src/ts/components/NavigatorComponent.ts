import { $, $$ } from '../dom';
import { MAIN_PAGE } from '../constants';
import { emit, on } from '../events';
import { getCurrentUser, isUserLoggedIn } from '../auth';

const tabs = ['products', 'coins', 'purchase'];

const render = (activePage: string, path: string) => {
  if (tabs.some((tab) => tab === path)) {
    $(`.nav__${path}-button`).className =
      path === activePage
        ? `nav__button nav__${path}-button nav__button--focused`
        : `nav__button nav__${path}-button`;
  }
  $(`.${path}-section`).className =
    path === activePage ? `${path}-section` : `${path}-section hide`;
};

export default class NavigatorComponent {
  private $app = $('#app');
  private $title = $('.vending-machine-title');
  private $nav = $('.nav');
  private $navList = $('.nav__list');
  private $tabs = $$('[data-path]');

  constructor() {
    on(this.$navList, 'click', this.onClickTab);
    on(window, 'popstate', this.routeByPath);

    if (isUserLoggedIn()) {
      $('.nav__login-button').classList.add('hide');
      $('.nav__user-button').classList.remove('hide');
    } else {
      $('.nav__login-button').classList.remove('hide');
      $('.nav__user-button').classList.add('hide');
    }
    this.routeByPath();
  }

  private onClickTab = (e) => {
    e.preventDefault();

    if (e.target.classList.contains('nav__button')) {
      this.changePage(e.target.dataset.path);
      window.history.pushState(null, null, e.target.dataset.path);
      emit(this.$app, `@${e.target.dataset.path}TabClicked`);
    }
  };

  private changePage = (targetTab) => {
    Array.from(this.$tabs).forEach((tabElement: HTMLElement) => {
      render(targetTab, tabElement.dataset.path);
      this.renderTitle(targetTab);
    });
  };

  private routeByPath = () => {
    const targetTab = window.location.pathname;
    this.changePage(targetTab.replace('/', '') || MAIN_PAGE);
  };

  private renderTitle = (targetPage) => {
    this.$title.classList.remove('hide');
    this.$nav.classList.remove('hide');
    if (
      ['login', 'signup', 'user'].some(
        (hideNavPath) => targetPage === hideNavPath
      )
    ) {
      this.$nav.classList.add('hide');
      this.$title.classList.add('hide');
    }
  };

  private renderUser = () => {};
}
