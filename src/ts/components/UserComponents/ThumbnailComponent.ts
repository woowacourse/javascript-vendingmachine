import { $, emit, on } from '../../dom/domHelper';
import { deleteCookie } from '../../cookie/cookie';
import { COOKIE_ID } from '../../constants/cookie';
import { PATHNAME } from '../../constants/pathname';

export default class ThumbnailComponent {
  private $dimmer = $<HTMLElement>('.dimmer');
  private $userThumbnailButton = $<HTMLButtonElement>('.user-thumbnail-button');
  private $informationWrapper = $<HTMLUListElement>(
    '.membership-information-wrapper'
  );

  constructor() {
    on(this.$userThumbnailButton, 'click', this.onClickUserThumbnailButton);
    on(this.$informationWrapper, 'click', this.onClickDropDownMenu);
  }

  onClickDropDownMenu = ({ target }): void => {
    if (target.matches('.membership-information-wrapper__logout-button')) {
      deleteCookie(COOKIE_ID.USER);
      window.history.pushState({}, '', PATHNAME.PURCHASE_PRODUCT);

      emit(this.$informationWrapper, '@logoutChangeComponent');
    }

    if (
      target.matches('.membership-information-wrapper__edit-information-button')
    ) {
      window.history.pushState({}, '', PATHNAME.MEMBERSHIP_EDIT);

      emit(this.$informationWrapper, '@editInformationChangeComponent');
      emit(this.$informationWrapper, '@loadUserInformation');
    }

    this.$informationWrapper.classList.add('hide');
  };

  onClickUserThumbnailButton = (): void => {
    this.$informationWrapper.classList.toggle('hide');
    this.$dimmer.classList.toggle('hide');
  };
}
