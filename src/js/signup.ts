import '../css/index.css';
import { $ } from './utils/dom.js';
import { requestRegister } from './api.js';

document.querySelector('#signup-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = $('#signup-email').value;
  const name = $('#signup-name').value;
  const password = $('#signup-password').value;

  const response = await requestRegister(email, name, password);

  if (!response.status) {
    alert(response.content);
    return;
  }

  alert('회원가입이 완료되었습니다.');
  location.href = './login.html';
});
