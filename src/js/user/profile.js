import '../../css/index.css';
import { requestUpdate } from '../utils/api.js';
import { $ } from '../utils/dom.js';
import { validPassword } from '../utils/validation.js';

$('#profile-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = $('#profile-email').value;
  const name = $('#profile-name').value;
  const password = $('#profile-password').value;
  const passwordConfirm = $('#profile-password-confirm').value;
  const user = { email, name, password };
  const userInfo = JSON.parse(sessionStorage.getItem('user'));
  try {
    validPassword(password, passwordConfirm);
    await requestUpdate(user, userInfo.id);
    alert('회원 정보가 수정되었습니다.');
    document.location.href = './login.html';
  } catch (error) {
    alert(error.message);
  }
});
