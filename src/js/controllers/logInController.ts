import LogInView from '../views/logInView';
import { onCustomEvent, showSnackBar } from '../utils/common';
import { Controller } from '../types/interface';

export default class LogInController implements Controller {
  private logInView: LogInView;

  constructor() {
    this.logInView = new LogInView();
  }

  bindEvents() {
    console.log('로그인 커스텀 이벤트 바인딩!');
  }

  loadPage() {
    this.logInView.render();

    this.bindEvents();
  }
}
