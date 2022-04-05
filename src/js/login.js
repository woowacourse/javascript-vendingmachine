import '../css/index.css';
import { SNACKBAR_MESSAGE } from './constants/constants.js';
import { $ } from './utils/dom.js';
import { handleSnackbarMessage } from './utils/snackbar.js';

const loginForm = $('#login-form');
const emailInput = $('#email-input');
const passwordInput = $('#password-input');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const loginEmailValue = emailInput.value;
  const loginPasswordValue = passwordInput.value;

  const response = await fetch('https://json-web-server-ronci.herokuapp.com/login', {
    method: 'POST',
    body: JSON.stringify({
      email: loginEmailValue,
      password: loginPasswordValue,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const dataResult = await response.json();
  sessionStorage.setItem('user', JSON.stringify(dataResult));

  if (dataResult.accessToken) {
    location.href = './manager.html';
    return;
  }
  handleSnackbarMessage(SNACKBAR_MESSAGE.NOT_USER);
});
