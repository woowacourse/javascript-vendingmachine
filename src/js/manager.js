import '../css/index.css';
import './route/route.js';
import './controller.js';
import { $ } from './utils/dom';

const { accessToken, user } = JSON.parse(localStorage.getItem('user'));

if (!accessToken) {
  location.href = './index.html';
}

const managerNameButton = $('#manager-name-button');
const optionList = $('#option-list');
const logoutButton = $('#logout');

managerNameButton.textContent = user.name.substr(0, 1);

managerNameButton.addEventListener('click', makeAnimation);
logoutButton.addEventListener('click', logout);

function makeAnimation() {
  optionList.classList.toggle('fadein-animation');
  optionList.classList.toggle('fadeout-animation');
  if (optionList.classList.contains('display-none')) {
    optionList.classList.remove('display-none');
  } else {
    setTimeout(() => {
      optionList.classList.add('display-none');
    }, 300);
  }
}

function logout() {
  localStorage.removeItem('user');
  location.href = './index.html';
}
