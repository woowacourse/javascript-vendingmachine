import pageTemplate from './template/page';

import { $, getInnerInputValues } from '../utils';
import { login } from '../utils/auth';

class LoginPageView {
  loadPage = () => {
    $('.main').innerHTML = pageTemplate.loginPage;
    $('#login-form').addEventListener('submit', this.onSubmitLoginForm);
  };

  onSubmitLoginForm = (event) => {
    event.preventDefault();
    const loginInfo = getInnerInputValues(event.target);
    login(loginInfo);
  };
}

export default new LoginPageView();
