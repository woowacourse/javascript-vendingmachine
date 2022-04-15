import { Menu } from './CustomElement';
import TEMPLATE from '../templates';
import { addEvent, $ } from '../utils';
import { historyRouterPush } from '../router';
import storage from '../storage';
import { Notification } from './CustomElement';
import { BASE_URL } from '../constants';

class UserMenu extends Menu {
  connectedCallback() {
    super.connectedCallback();
  }

  render() {
    this.innerHTML = this.template();

    const isLogin = !!localStorage.getItem('accessToken');
    const userName = storage.getLocalStorage('user') ? storage.getLocalStorage('user').name : '';

    $('.user-name', this).classList.toggle('hidden', !isLogin);
    $('.login-button', this).classList.toggle('hidden', isLogin);
    $('.user-name__menu-button', this).insertAdjacentHTML('afterbegin', userName.substring(0, 1));
  }

  template() {
    return TEMPLATE.USER_MENU;
  }

  setEvent() {
    addEvent(this, 'click', '.user-name__menu-button', () => this.handleMenu());
    addEvent(this, 'click', '.user-name__edit', () => this.handleEdit());
    addEvent(this, 'click', '.user-name__logout', () => this.handleLogout());
  }

  handleMenu() {
    $('.user-name__menu-button', this).classList.toggle('shadow');
    $('.menu-element.user-name__edit', this).classList.toggle('user-name__edit--move');
    $('.menu-element.user-name__logout', this).classList.toggle('user-name__logout--move');
  }

  handleEdit() {
    const user = storage.getLocalStorage('user');

    if (!user) return;

    ($('[name=email]', $('profile-edit-page')) as HTMLInputElement).value = user.email;
    ($('[name=userName]', $('profile-edit-page')) as HTMLInputElement).value = user.name;

    historyRouterPush(BASE_URL + '/profile');
  }

  handleLogout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    location.href = location.origin + BASE_URL + '/';
  }

  notify({ userName }: Notification) {
    $('.user-name__menu-button').textContent = userName.substring(0, 1);
  }
}

customElements.define('user-menu', UserMenu);

export default UserMenu;
