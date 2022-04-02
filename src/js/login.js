import '../css/index.css';
import { $ } from './utils/dom';

const loginForm = $('#login-form');
const emailInput = $('#email-input');
const passwordInput = $('#password-input');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const loginEmailValue = emailInput.value;
  const loginPasswordValue = passwordInput.value;

  const response = await fetch('http://localhost:3000/login', {
    method: 'POST',
    body: JSON.stringify({
      email: loginEmailValue,
      password: loginPasswordValue,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const dataResult = await response.json();
  localStorage.setItem('user', JSON.stringify(dataResult));

  if (dataResult.accessToken) {
    location.href = './manager.html';
    return;
  }
  alert('존재하지 않는 회원입니다.');
});
