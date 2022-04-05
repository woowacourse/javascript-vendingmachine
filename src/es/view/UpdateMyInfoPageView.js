import pageTemplate from './template/page';

import { $, getInnerInputValues, showSnackBar } from '../utils';
import { updateUserInfo } from '../utils/auth';

import { validateUserInfo } from '../validator';

import User from '../data/User';

class UpdateMyInfoPageView {
  loadPage = () => {
    $('.main').innerHTML = pageTemplate.updateMyInfoPage({ email: User.email, name: User.name });
    $('#update-my-info-form').addEventListener('submit', this.onSubmitUpdateMyInfoForm);
  };

  onSubmitUpdateMyInfoForm = (event) => {
    event.preventDefault();
    const { email, name, password, passwordConfirm } = getInnerInputValues(event.target);
    try {
      validateUserInfo({ email, name, password, passwordConfirm });
    } catch (err) {
      showSnackBar(err.message);
      return;
    }
    updateUserInfo({ email, name, password });
  };
}

export default new UpdateMyInfoPageView();
