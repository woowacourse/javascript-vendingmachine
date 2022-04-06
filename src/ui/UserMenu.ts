import { CustomElement } from './CustomElement';
import TEMPLATE from '../templates';
import { addEvent, $ } from '../utils';
import { historyRouterPush } from '../router';
import storage from '../storage';
import Authentication from '../domain/Authentication';
import { Notification } from './CustomElement';

class UserMenu extends CustomElement {
  connectedCallback() {
    super.connectedCallback();
    Authentication.instance.subscribe('userMenu', this);
  }

  render() {
    this.innerHTML = this.template();
  }

  template() {
    return TEMPLATE.USER_MENU;
  }

  setEvent() {
    addEvent(this, 'click', '.user-name__edit', () => this.handleEdit());
    addEvent(this, 'click', '.user-name__logout', () => this.handleLogout());
  }

  handleEdit() {
    const user = storage.getLocalStorage('user');

    if (!user) return;

    ($('[name=email]', $('profile-edit-page')) as HTMLInputElement).value = user.email;
    ($('[name=userName]', $('profile-edit-page')) as HTMLInputElement).value = user.name;

    historyRouterPush('/javascript-vendingmachine/profile');
  }

  handleLogout() {
    localStorage.clear();
    location.href = location.origin + '/javascript-vendingmachine/';
  }

  notify({ userName }: Notification) {
    $('.user-name__menu-button').textContent = userName.substring(0, 1);
  }
}

customElements.define('user-menu', UserMenu);

export default UserMenu;
