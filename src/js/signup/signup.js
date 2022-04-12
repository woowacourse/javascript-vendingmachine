import '../../css/index.css';
import { validEmail, validPassword } from './validAccount';
import { $ } from '../utils/dom';
import { handleSnackbarMessage } from '../utils/snackbar';
import { signup } from '../utils/API';

const signUpForm = $('#sign-up-info-form');
const emailInput = $('#email-input');
const nameInput = $('#name-input');
const passwordInput = $('#password-input');
const passwordCheckInput = $('#password-check');

signUpForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nameValue = nameInput.value;
  const emailValue = emailInput.value;
  const passwordValue = passwordInput.value;
  const passwordCheckValue = passwordCheckInput.value;

  try {
    validPassword(passwordValue, passwordCheckValue);
    const response = await signup(nameValue, emailValue, passwordValue);

    const dataResult = await response.json();
    if (!validEmail(dataResult)) return;

    location.href = './login.html';
  } catch (error) {
    handleSnackbarMessage(error.message);
  }
});
