import '../css/index';
import { SNACKBAR_MESSAGE } from './constants/constants';
import { login } from './utils/API';
import { $ } from './utils/dom';
import { handleSnackbarMessage } from './utils/snackbar';
import { sessionStore } from './utils/storage';

const loginForm = $('#login-form');
const emailInput = $('#email-input');
const passwordInput = $('#password-input');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const loginEmailValue = emailInput.value;
  const loginPasswordValue = passwordInput.value;

  const response = await login(loginEmailValue, loginPasswordValue);

  const dataResult = await response.json();
  sessionStore.set('user', dataResult);

  if (dataResult.accessToken) {
    location.href = './manager.html';
    return;
  }
  handleSnackbarMessage(SNACKBAR_MESSAGE.NOT_USER);
});
