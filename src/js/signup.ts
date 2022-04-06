import '../css/index.css';
import { $ } from './utils/dom.js';
import { requestRegister } from './api.js';
import { validPassword } from './utils/validation';

$('#signup-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = $('#signup-email').value;
  const name = $('#signup-name').value;
  const password = $('#signup-password').value;
  const passwordConfirm = $('#signup-password-confirm').value;
  try {
    validPassword(password, passwordConfirm);
    const response = await requestRegister(email, name, password);
    if (!response.status) {
      alert(response.content);
      return;
    }
    alert('회원가입이 완료되었습니다.');
    location.href = './login.html';
  } catch (error) {
    alert(error.message);
  }
});
