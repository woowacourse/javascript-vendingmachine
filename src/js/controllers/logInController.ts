import LogInView from '../views/logInView';
import { emitCustomEvent, onCustomEvent, showSnackBar } from '../utils/common';
import { Controller } from '../types/interface';
import { SNACK_BAR_MESSAGE } from '../constants/constants';
import { logIn } from '../../apis/auth';

export default class LogInController implements Controller {
  private logInView: LogInView;

  constructor() {
    this.logInView = new LogInView();

    this.bindEvents();
  }

  public bindEvents() {
    onCustomEvent('LOG_IN', this.handleLogIn);
  }

  private handleLogIn = (event: CustomEvent) => {
    const { email, password, targetId } = event.detail;
    const data = JSON.stringify({
      email,
      password,
    });

    const response = logIn(data);

    response
      .then(result => {
        const { accessToken, user } = result;
        if (!accessToken) {
          throw new Error(result);
        }
        sessionStorage.setItem('jwt-token', accessToken);
        sessionStorage.setItem('isLogIn', 'true');
        sessionStorage.setItem('user', JSON.stringify(user));

        emitCustomEvent('ROUTE_CHANGE', { detail: { targetId } });
        showSnackBar(SNACK_BAR_MESSAGE.LOGIN_SUCCESS);
      })
      .catch(error => alert(error.message));
  };

  public loadPage(isLogin: boolean) {
    this.logInView.render(isLogin);
  }
}
