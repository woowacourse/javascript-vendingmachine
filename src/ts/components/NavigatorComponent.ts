import { $, $$ } from '../dom';
import { MAIN_PAGE } from '../constants';
import { emit, on } from '../events';
import { isUserLoggedIn } from '../auth';

const tabs = ['products', 'coins', 'purchase'];

const render = (activePage: string, path: string) => {
  if (tabs.some((tab) => tab === path) && $('.nav__list')) {
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
  private $pages = $$('[data-path]');

  constructor() {
    on(this.$app, 'click', this.onClickRoute);
    on(window, 'popstate', this.routeByPath);

    this.renderUserButton();
    const customerAccessiblePages = ['/purchase', '/login', '/signup'];
    if (!isUserLoggedIn()) {
      this.$navList.remove();
    }
    if (
      !isUserLoggedIn() &&
      !customerAccessiblePages.some((page) => window.location.pathname === page)
    ) {
      location.pathname = '/purchase';
    }
    this.routeByPath();
  }

  private onClickRoute = (e) => {
    if (e.target.dataset.path) {
      e.preventDefault();

      this.changePage(e.target.dataset.path);
      window.history.pushState(null, null, e.target.dataset.path);
      emit(this.$app, `@${e.target.dataset.path}TabClicked`);
    }
  };

  private changePage = (targetPage) => {
    Array.from(this.$pages).forEach((page: HTMLElement) => {
      render(targetPage, page.dataset.path);
      this.renderTitle(targetPage);
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

  private renderUserButton = () => {
    if (isUserLoggedIn()) {
      $('.nav__login-button').classList.add('hide');
      $('.logged-user-wrapper').classList.remove('hide');
    } else {
      $('.nav__login-button').classList.remove('hide');
      $('.logged-user-wrapper').classList.add('hide');
    }
  };
}
