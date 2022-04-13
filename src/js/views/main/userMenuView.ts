import { userMenuTemplate } from '../../templates/main/userMenuTemplate';
import { $, emit } from '../../utils/common';
import { CUSTOM_EVENT, URL } from '../../constants/appContants';
import { SELECTOR } from '../../constants/viewConstants';
import { CONFIRM_MESSAGE } from '../../constants/confirmConstants';
import Storage from '../../api/storage';

export default class UserMenuView {
  showMenu() {
    const $app = $(SELECTOR.ID.APP);
    $app.insertAdjacentHTML('beforeend', userMenuTemplate);

    $(SELECTOR.ID.MENU_EDIT_PROFILE).addEventListener(
      'click',
      this.handleEditProfileClick.bind(this)
    );
    $(SELECTOR.ID.MENU_SIGN_OUT).addEventListener('click', this.handleSignOutClick.bind(this));
  }

  hideMenu() {
    $(SELECTOR.ID.USER_MENU).remove();
  }

  private handleEditProfileClick(event: { target: HTMLButtonElement }) {
    const { url } = event.target.dataset;

    emit({ eventName: CUSTOM_EVENT.PAGE_CHANGE, detail: { page: URL.SIGN, section: url } });
  }

  private handleSignOutClick() {
    if (!window.confirm(CONFIRM_MESSAGE.SIGN_OUT)) return;

    Storage.deleteUserData();

    emit({
      eventName: CUSTOM_EVENT.PAGE_CHANGE,
      detail: { page: URL.MAIN, section: URL.PURCHASE_ITEM },
    });
  }
}
