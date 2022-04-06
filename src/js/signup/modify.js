import '../../css/index.css';
import { $ } from '../utils/dom';
import { validPassword } from './validAccount';
import { handleSnackbarMessage } from '../utils/snackbar.js';
import { modifyUserInfo } from '../utils/API';
import { getSessionStorage } from '../utils/sessionStorage';

const { user } = getSessionStorage('user');

const signUpForm = $('#sign-up-info-form');
const emailInput = $('#email-input');
const nameInput = $('#name-input');
const passwordInput = $('#password-input');
const passwordCheckInput = $('#password-check');

emailInput.value = user.email;
nameInput.value = user.name;

signUpForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nameValue = nameInput.value;
  const passwordValue = passwordInput.value;
  const passwordCheckValue = passwordCheckInput.value;

  try {
    validPassword(passwordValue, passwordCheckValue);
    await modifyUserInfo(nameValue, user.email, passwordValue, user.id);

    location.href = './login.html';
  } catch (error) {
    handleSnackbarMessage(error.message);
  }
});
