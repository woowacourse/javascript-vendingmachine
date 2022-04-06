import { getCookie } from '../cookie/cookie';
import { requestUserInfo } from '../api/api';

import { $, $$, on } from '../dom/domHelper';

export default class NavigatorComponent {
  private $navList = $<HTMLElement>('.nav__list');
  private $$navButtons = $$<HTMLButtonElement>('.nav__button');
  private $$changeComponents = $$<HTMLElement>('.change-component');
  private $signInButton = $<HTMLButtonElement>('.sign-in-button');
  private $nav = $<HTMLElement>('.nav');
  private $title = $<HTMLHeadingElement>('h1');
  private $userThumbnailButton = $<HTMLButtonElement>('.user-thumbnail-button');
  private $informationWrapper = $<HTMLUListElement>(
    '.membership-information-wrapper'
  );
  private $editEmailInput = $<HTMLInputElement>(
    '.membership-edit-form__email-input'
  );
  private $editNameInput = $<HTMLInputElement>(
    '.membership-edit-form__name-input'
  );

  constructor() {
    on(this.$navList, 'click', this.onClickNavButton);

    on(window, '@popstateChangeComponent', this.changeComponent);

    on(this.$signInButton, '@signInChangeComponent', this.changeComponent);
    on(
      $<HTMLAnchorElement>('.sign-in-section__sign-up-button'),
      '@signUpChangeComponent',
      this.changeComponent
    );
    on(
      this.$informationWrapper,
      '@logoutChangeComponent',
      this.changeComponent
    );

    on(
      $<HTMLButtonElement>('.sign-up-form__verify-button'),
      '@signInChangeComponent',
      this.changeComponent
    );
    on(
      $<HTMLButtonElement>('.sign-in-form__verify-button'),
      '@purchaseProductChangeComponentWithUser',
      this.changeComponent
    );

    on(
      this.$informationWrapper,
      '@editInformationChangeComponent',
      this.changeComponent
    );
    on(
      $<HTMLButtonElement>('.membership-edit-form__verify-button'),
      '@purchaseProductChangeComponentWithUser',
      this.changeComponent
    );
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

  private focusedNavButton(pathname: string): void {
    this.$$navButtons.forEach((button) => {
      if (pathname !== button.dataset.pathname) {
        button.classList.remove('nav__button--focused');
      }

      if (pathname === button.dataset.pathname) {
        button.classList.add('nav__button--focused');
      }
    });
  }

  async setUserInformation(user) {
    const { email, name } = await requestUserInfo(user.accessToken, user.id);

    this.$editEmailInput.value = email;
    this.$editNameInput.value = name;
  }

  private async checkExistUser(pathname: string) {
    const user = getCookie('user') && JSON.parse(getCookie('user'));

    if (
      pathname === '/sign-in' ||
      pathname === '/sign-up' ||
      pathname === '/edit-information'
    ) {
      this.$nav.classList.add('hide');
      this.$title.classList.add('hide');
      this.$signInButton.classList.add('hide');
      this.$userThumbnailButton.classList.add('hide');

      if (user) await this.setUserInformation(user);

      return;
    }

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
  }

  private changeComponent = async () => {
    const { pathname } = window.location;

    this.$$changeComponents.forEach((section) => {
      if (pathname !== section.dataset.pathname) {
        section.classList.add('hide');
      }

      if (pathname === section.dataset.pathname) {
        section.classList.remove('hide');
      }
    });

    this.focusedNavButton(pathname);
    await this.checkExistUser(pathname);
  };
}
