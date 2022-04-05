import { CustomElement } from './CustomElement';
import TEMPLATE from '../templates';
import { addEvent, emit } from '../utils';
import Authentication from '../domain/Authentication';
import { historyRouterPush } from '../router';

class LoginPage extends CustomElement {
  connectedCallback() {
    super.connectedCallback();
    Authentication.instance.subscribe('subscribeLoginPage', this);
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

    emit('.login-form', '@login', { email: form.email.value, password: form.password.value }, this);
  }

  handleSignup(e: MouseEvent & { target: HTMLAnchorElement }) {
    e.preventDefault();
    historyRouterPush('/javascript-vendingmachine/signup');
  }
}

customElements.define('login-page', LoginPage);

export default LoginPage;
