import '../../css/index.css';
import { $ } from '../utils/dom';
import { validEmail, validPassword } from './validAccount';
import { handleSnackbarMessage } from '../utils/snackbar.js';

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
    const response = await fetch('http://localhost:3000/register', {
      method: 'POST',
      body: JSON.stringify({
        name: nameValue,
        email: emailValue,
        password: passwordValue,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const dataResult = await response.json();
    if (!validEmail(dataResult)) return;

    location.href = './login.html';
  } catch (error) {
    handleSnackbarMessage(error.message);
  }
});
