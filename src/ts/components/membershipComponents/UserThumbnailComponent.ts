import { $, emit, on } from '../../dom/domHelper';
import { deleteCookie } from '../../cookie/cookie';

export default class UserThumbnailComponent {
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
      deleteCookie('user');
      window.history.pushState({}, '', '/purchase-product');

      emit(this.$informationWrapper, '@logoutChangeComponent');
    }

    if (
      target.matches('.membership-information-wrapper__edit-information-button')
    ) {
      window.history.pushState({}, '', '/edit-information');

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
