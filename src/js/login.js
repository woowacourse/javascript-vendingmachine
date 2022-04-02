import '../css/index.css';
import { $ } from './utils/dom';

const loginForm = $('#login-form');
const emailInput = $('#email-input');
const passwordInput = $('#password-input');

// { accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC50IiwiaWF0IjoxNjQ4NTUxOTI1LCJleHAiOjE2NDg1NTU1MjUsInN1YiI6IjUifQ.26PM49a7CbUPOz9fVu1nz7Qcc6svWjvM8Qwll4P_Gsk" user: {email: "test@test.t", id: 5} }

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

  // accessToken -> localStorage storage
  const dataResult = await response.json();
  localStorage.setItem('user', JSON.stringify(dataResult));

  if (dataResult.accessToken) {
    location.href = './manager.html';
    return;
  }
  alert('존재하지 않는 회원입니다.');
});
