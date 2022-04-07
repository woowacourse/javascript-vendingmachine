import '../../css/index.css';
import { $ } from '../utils/dom.js';
import { requestRegister } from '../utils/api.js';
import { validPassword } from '../utils/validation.js';

$('#signup-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = $('#signup-email').value;
  const name = $('#signup-name').value;
  const password = $('#signup-password').value;
  const passwordConfirm = $('#signup-password-confirm').value;
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
