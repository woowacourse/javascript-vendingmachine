import '../css/index';
import { login } from './utils/API';
import { SNACKBAR_MESSAGE } from './constants/constants';
import { $ } from './utils/dom';
import { handleSnackbarMessage } from './utils/snackbar';
import { setSessionStorage } from './utils/sessionStorage';

const loginForm = $('#login-form');
const emailInput = $('#email-input');
const passwordInput = $('#password-input');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const loginEmailValue = emailInput.value;
  const loginPasswordValue = passwordInput.value;

  const response = await login(loginEmailValue, loginPasswordValue);

  const dataResult = await response.json();
  setSessionStorage('user', dataResult);

  if (dataResult.accessToken) {
    location.href = './manager.html';
    return;
  }
  handleSnackbarMessage(SNACKBAR_MESSAGE.NOT_USER);
});
