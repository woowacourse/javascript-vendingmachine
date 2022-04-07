import '../../css/index.css';
import { $ } from '../utils/dom.js';
import { requestRegister } from '../utils/api.js';
import { validPassword } from '../utils/validation.js';

$('#sign-up-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = $('#sign-up-email').value;
  const name = $('#sign-up-name').value;
  const password = $('#sign-up-password').value;
  const passwordConfirm = $('#sign-up-password-confirm').value;
  const user = { email, name, password };
  try {
    validPassword(password, passwordConfirm);
    await requestRegister(user);
    alert('회원가입이 완료되었습니다.');
    document.location.href = './login.html';
  } catch (error) {
    alert(error.message);
  }
});
