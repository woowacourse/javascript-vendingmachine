import '../css/index.css';
import { requestLogin } from './api.js';
import { $ } from './utils/dom.js';

$('#login-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = $('#login-email').value;
  const password = $('#login-password').value;
  const response = await requestLogin(email, password);

  if (!response.status) {
    alert(response.content);
    return;
  }
  const { accessToken, user } = response.content;
  sessionStorage.setItem('user', JSON.stringify({ accessToken, id: user.id }));
  location.href = './';
});
