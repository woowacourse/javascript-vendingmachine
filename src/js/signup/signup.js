import '../../css/index.css';
import { $ } from '../utils/dom';
import { validPassword } from './validPassword';

const signUpForm = $('#sign-up-info-form');
const emailInput = $('#email-input');
const nameInput = $('#name-input');
const passwordInput = $('#password-input');
const passwordCheckInput = $('#password-check');

signUpForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = nameInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;
  const passwordCheck = passwordCheckInput.value;

  try {
    validPassword(password, passwordCheck);
    console.log(password);
  } catch (error) {
    alert(error.message);
  }
});
