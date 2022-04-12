import { CustomElement, Notification } from './CustomElement';
import TEMPLATE from '../templates';
import { addEvent, emit, $, showSnackbar } from '../utils';
import Authentication from '../domain/Authentication';
import { historyRouterPush } from '../router';
import { BASE_URL, CUSTOM_EVENT, ELEMENT_KEY } from '../constants';

class LoginPage extends CustomElement {
  connectedCallback() {
    super.connectedCallback();
    Authentication.instance.subscribe(ELEMENT_KEY.LOGIN, this);
  }

  render() {
    this.innerHTML = this.template();
  }

  template() {
    return TEMPLATE.LOGIN_PAGE;
  }

  setEvent() {
    addEvent(this, 'submit', '.login-form', (e: SubmitEvent & { target: HTMLFormElement }) => this.handleLogin(e));
    addEvent(this, 'click', 'a', (e: MouseEvent & { target: HTMLAnchorElement }) => this.handleSignup(e));
  }

  handleLogin(e: SubmitEvent & { target: HTMLFormElement }) {
    e.preventDefault();
    const form = e.target;

    emit('.login-form', CUSTOM_EVENT.AUTH.LOGIN, { email: form.email.value, password: form.password.value }, this);
  }

  handleSignup(e: MouseEvent & { target: HTMLAnchorElement }) {
    e.preventDefault();
    historyRouterPush(BASE_URL + '/signup');
  }

  notify({ userName }: Notification) {
    $('.nav').classList.remove('hidden');
    $('.signup-button').classList.add('hidden');
    $('.login-button').classList.add('hidden');
    $('.user-name').classList.remove('hidden');
    $('.user-name__menu-button').insertAdjacentHTML('afterbegin', userName.substring(0, 1));

    showSnackbar(`안녕하세요 ${userName}님 :)`);
  }
}

customElements.define('login-page', LoginPage);

export default LoginPage;
