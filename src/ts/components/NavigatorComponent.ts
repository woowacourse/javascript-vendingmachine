import { $, $$, on } from '../dom/domHelper';
import { getCookie } from '../cookie/cookie';

export default class NavigatorComponent {
  private $navList = $<HTMLElement>('.nav__list');
  private $$navButtons = $$<HTMLButtonElement>('.nav__button');
  private $$manageComponents = $$<HTMLElement>('.manage-component');
  private $$membershipComponents = $$<HTMLElement>('.membership-component');
  private $signInButton = $<HTMLButtonElement>('.sign-in-button');
  private $signUpButton = $<HTMLAnchorElement>(
    '.sign-in-section__sign-up-button'
  );
  private $signUpVerifyButton = $<HTMLButtonElement>(
    '.sign-up-form__verify-button'
  );
  private $signInVerifyButton = $<HTMLButtonElement>(
    '.sign-in-form__verify-button'
  );

  private $nav = $<HTMLElement>('.nav');
  private $title = $<HTMLHeadingElement>('h1');
  private $userThumbnailButton = $<HTMLButtonElement>('.user-thumbnail-button');
  private $informationWrapper = $<HTMLUListElement>(
    '.membership-information-wrapper'
  );

  constructor() {
    on(this.$navList, 'click', this.onClickNavButton);
    on(window, '@popstateChangeComponent', this.changeComponent);
    on(this.$signInButton, '@signInChangeComponent', this.changeComponent);
    on(this.$signUpButton, '@signUpChangeComponent', this.changeComponent);
    on(
      this.$signUpVerifyButton,
      '@renderSignInComponent',
      this.changeComponent
    );
    on(
      this.$signInVerifyButton,
      '@membershipPurchaseProduct',
      this.changeComponent
    );
    on(this.$informationWrapper, '@logout', this.changeComponent);
  }

  private onClickNavButton = (event: Event): void => {
    event.preventDefault();
    const target = event.target as HTMLElement;
    if (
      !target.matches('.nav__product-button') &&
      !target.matches('.nav__charge-button') &&
      !target.matches('.nav__purchase-button')
    ) {
      return;
    }

    window.history.pushState({}, '', target.dataset.pathname);
    this.changeComponent();
  };

  private changeComponent = (): void => {
    const { pathname } = window.location;

    this.$$membershipComponents.forEach((section) => {
      if (pathname !== section.dataset.pathname) {
        section.classList.add('hide');
      }

      if (pathname === section.dataset.pathname) {
        section.classList.remove('hide');
      }
    });

    this.$$navButtons.forEach((button) => {
      if (pathname !== button.dataset.pathname) {
        button.classList.remove('nav__button--focused');
      }

      if (pathname === button.dataset.pathname) {
        button.classList.add('nav__button--focused');
      }
    });

    this.$$manageComponents.forEach((section) => {
      if (pathname !== section.dataset.pathname) {
        section.classList.add('hide');
      }

      if (pathname === section.dataset.pathname) {
        section.classList.remove('hide');
      }
    });

    if (
      pathname === '/sign-in' ||
      pathname === '/sign-up' ||
      pathname === '/edit-information'
    ) {
      this.$nav.classList.add('hide');
      this.$title.classList.add('hide');
      this.$signInButton.classList.add('hide');
      this.$userThumbnailButton.classList.add('hide');

      return;
    }

    const user = getCookie('user') && JSON.parse(getCookie('user'));

    if (user) {
      this.$nav.classList.remove('hide');
      this.$title.classList.remove('hide');
      this.$signInButton.classList.add('hide');
      this.$userThumbnailButton.classList.remove('hide');
      this.$userThumbnailButton.textContent = user.name[0];

      return;
    }

    this.$nav.classList.add('hide');
    this.$title.classList.remove('hide');
    this.$signInButton.classList.remove('hide');
    this.$userThumbnailButton.classList.add('hide');
    this.$userThumbnailButton.textContent = '';
  };
}
