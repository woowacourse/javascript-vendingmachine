import { getCookie } from '../cookie/cookie';
import { requestUserInfo } from '../api/api';

import { $, $$, on } from '../dom/domHelper';

const isMismatchesNavClassName = (target: HTMLElement): boolean =>
  !target.matches('.nav__product-button') &&
  !target.matches('.nav__charge-button') &&
  !target.matches('.nav__purchase-button');

const isMembershipPathname = (pathname: string): boolean =>
  pathname === '/sign-in' ||
  pathname === '/sign-up' ||
  pathname === '/edit-information';

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

  private onClickNavButton = (event: MouseEvent): void => {
    event.preventDefault();

    const $targetNavButton = event.target as HTMLElement;

    if (isMismatchesNavClassName($targetNavButton)) {
      return;
    }

    window.history.pushState({}, '', $targetNavButton.dataset.pathname);
    this.changeComponent();
  };

  private focusedNavButton(pathname: string): void {
    this.$$navButtons.forEach((button) => {
      button.classList.toggle(
        'nav__button--focused',
        pathname === button.dataset.pathname
      );
    });
  }

  async setUserInformation(user) {
    const { email, name } = await requestUserInfo(user);

    this.$editEmailInput.value = email;
    this.$editNameInput.value = name;
  }

  private async checkExistUser(pathname: string) {
    const user = getCookie('user') && JSON.parse(getCookie('user'));

    this.$nav.classList.toggle('hide', !user || isMembershipPathname(pathname));
    this.$userThumbnailButton.classList.toggle(
      'hide',
      !user || isMembershipPathname(pathname)
    );
    this.$signInButton.classList.toggle(
      'hide',
      user || isMembershipPathname(pathname)
    );

    if (user) {
      this.$userThumbnailButton.textContent = user.name[0];
      this.setUserInformation(user);

      return;
    }

    if (!user && pathname === '/edit-information') {
      window.history.pushState({}, '', '/purchase-product');
      this.changeComponent();
    }

    this.$userThumbnailButton.textContent = '';
  }

  private changeComponent = async () => {
    const { pathname } = window.location;

    this.$$changeComponents.forEach((section) => {
      section.classList.toggle('hide', pathname !== section.dataset.pathname);
    });

    this.$title.classList.toggle('hide', isMembershipPathname(pathname));
    this.focusedNavButton(pathname);
    await this.checkExistUser(pathname);
  };
}
