import pageTemplate from './template/page';

import { $, getInnerInputValues, showSnackBar } from '../utils';
import { signUp } from '../utils/auth';

import { validateUserInfo } from '../validator';

class SignUpPageView {
  loadPage = () => {
    $('.main').innerHTML = pageTemplate.signUpPage;
    $('#signup-form').addEventListener('submit', this.onSubmitSignUpForm);
  };

  onSubmitSignUpForm = (event) => {
    event.preventDefault();
    const { email, name, password, passwordConfirm } = getInnerInputValues(event.target);
    try {
      validateUserInfo({ email, name, password, passwordConfirm });
    } catch (err) {
      showSnackBar(err.message);
      return;
    }
    signUp({ email, name, password });
  };
}

export default new SignUpPageView();
