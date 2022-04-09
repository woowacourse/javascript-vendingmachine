import '../../css/index.css';
import { requestLogin } from '../utils/api.js';
import { $ } from '../utils/dom.js';

$('#login-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = $('#login-email').value;
  const password = $('#login-password').value;
  const response = await requestLogin(email, password);
  const { accessToken, user } = response;
  sessionStorage.setItem('user', JSON.stringify({ accessToken, id: user.id }));
  document.location.href = './';
});
