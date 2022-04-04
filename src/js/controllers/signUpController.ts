import SignUpView from '../views/signUpView';
import { onCustomEvent, showSnackBar } from '../utils/common';
import { Controller } from '../types/interface';

export default class SignUpController implements Controller {
  private signUpView: SignUpView;

  constructor() {
    this.signUpView = new SignUpView();
  }

  bindEvents() {
    console.log('회원가입 커스텀 이벤트 바인딩!');
  }

  loadPage() {
    this.signUpView.render();

    this.bindEvents();
  }
}
