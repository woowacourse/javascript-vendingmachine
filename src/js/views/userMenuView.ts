import { userMenuTemplate } from '../templates/userMenuTemplate';
import { $, emit } from '../utils/common';
import { CUSTOM_EVENT, URL } from '../constants/appContants';
import AuthManager from '../auth/authManager';

export default class UserMenuView {
  private $app: HTMLElement;

  constructor() {
    this.$app = $('#app');
  }

  showMenu() {
    this.$app.insertAdjacentHTML('beforeend', userMenuTemplate);

    $('#menu-edit-profile').addEventListener('click', this.handleEditProfileClick.bind(this));
    $('#menu-sign-out').addEventListener('click', this.handleSignOutClick.bind(this));
  }

  hideMeny() {
    $('#user-menu').remove();
  }

  private handleEditProfileClick(event) {
    const { url } = event.target.dataset;

    emit({ eventName: CUSTOM_EVENT.ROUTE_CHANGE, detail: { url, page: URL.SIGN } });
    emit({ eventName: CUSTOM_EVENT.RENDER_PAGE });
  }

  private handleSignOutClick() {
    AuthManager.shared().signOut();

    emit({
      eventName: CUSTOM_EVENT.ROUTE_CHANGE,
      detail: { url: URL.PURCHASE_ITEM, page: URL.MAIN },
    });
    emit({ eventName: CUSTOM_EVENT.RENDER_PAGE });
  }
}
