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

    fetch('http://localhost:3000/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: data,
    })
      .then(res => {
        return res.json();
      })
      .then(result => {
        const { accessToken, user } = result;
        if (!accessToken) {
          throw new Error(result);
        }
        sessionStorage.setItem('jwt-token', accessToken);
        sessionStorage.setItem('isLogIn', 'true');
        sessionStorage.setItem('user', user);

        emitCustomEvent('ROUTE_CHANGE', { detail: { targetId } });
        showSnackBar('회원가입 되었습니다.');
      })
      .catch(error => alert(error.message));
  }

  loadPage(isLogin) {
    this.signUpView.render(isLogin);
  }
}
