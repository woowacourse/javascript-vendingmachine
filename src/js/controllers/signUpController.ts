import SignUpView from '../views/signUpView';
import { emitCustomEvent, onCustomEvent, showSnackBar } from '../utils/common';
import { Controller } from '../types/interface';

export default class SignUpController implements Controller {
  private signUpView: SignUpView;

  constructor() {
    this.signUpView = new SignUpView();

    this.bindEvents();
  }

  bindEvents() {
    onCustomEvent('SIGN_UP', this.handleSignUp.bind(this));
  }

  handleSignUp(event: CustomEvent) {
    const { email, name, password, targetId } = event.detail;
    const data = JSON.stringify({
      email,
      name,
      password,
    });

    fetch('https://json-vendingmachine-server.herokuapp.com/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: data,
    })
      .then(res => {
        return res.json();
      })
      .then(result => {
        const { accessToken } = result;
        if (!accessToken) {
          throw new Error(result);
        }

        emitCustomEvent('ROUTE_CHANGE', { detail: { targetId } });
        showSnackBar('회원가입 되었습니다.');
      })
      .catch(error => alert(error.message));
  }

  loadPage(isLogin) {
    this.signUpView.render(isLogin);
  }
}
