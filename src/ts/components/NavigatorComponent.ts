import { $, $$, on } from '../dom/domHelper';

export default class NavigatorComponent {
  private $navList: HTMLElement = $('.nav__list');

  constructor() {
    on(this.$navList, 'click', this.onClickNavButton);
    on(window, '@popstateChangeComponent', this.changeComponent);
  }

  private onClickNavButton = (event: Event): void => {
    event.preventDefault();
    const target = event.target as HTMLElement;
    if (
      !target.matches('.nav__product-button') &&
      !target.matches('.nav__charge-button')
    ) {
      return;
    }

    window.history.pushState({}, '', target.dataset.pathname);
    this.changeComponent();
  };

  private changeComponent(): void {
    const { pathname } = window.location;

    $$('.nav__button').forEach((button) => {
      if (pathname !== button.dataset.pathname) {
        button.classList.remove('nav__button--focused');
      }

      if (pathname === button.dataset.pathname) {
        button.classList.add('nav__button--focused');
      }
    });

    $$('.manage-component').forEach((section) => {
      if (pathname !== section.dataset.pathname) {
        section.classList.add('hide');
      }

      if (pathname === section.dataset.pathname) {
        section.classList.remove('hide');
      }
    });
  }
}
