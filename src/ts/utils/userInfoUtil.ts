import { $ } from './dom';

export const resetLoginInfo = function () {
  $('#login-form__email-input').value = '';
  $('#login-form__password-input').value = '';
};

export const getLoginInfo = function () {
  const email = $('#login-form__email-input').value;
  const password = $('#login-form__password-input').value;

  return { email, password };
};

export const resetSignUpInfo = function () {
  $('#signup-form__email-input').value = '';
  $('#signup-form__name-input').value = '';
  $('#signup-form__password-input').value = '';
  $('#signup-form__password-check-input').value = '';
};

export const getSignUpInfo = function () {
  const email = $('#signup-form__email-input').value;
  const name = $('#signup-form__name-input').value;
  const password = $('#signup-form__password-input').value;
  const passwordConfirm = $('#signup-form__password-check-input').value;

  return { email, name, password, passwordConfirm };
};

export const resetUserInfo = function () {
  $('#edit-profile-form__email-input').value = '';
  $('#edit-profile-form__name-input').value = '';
  $('#edit-profile-form__password-input').value = '';
  $('#edit-profile-form__password-check-input').value = '';
};

export const getUserInfo = function () {
  const email = $('#edit-profile-form__email-input').value;
  const name = $('#edit-profile-form__name-input').value;
  const password = $('#edit-profile-form__password-input').value;
  const passwordConfirm = $('#edit-profile-form__password-check-input').value;

  return { email, name, password, passwordConfirm };
};
