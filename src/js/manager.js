import '../css/index';
import './route/route';
import './controller';
import { $ } from './utils/dom';
import { sessionStore } from './utils/storage';

const userData = sessionStore.get('user');

if (!userData) {
  location.href = './index.html';
}

const managerNameButton = $('#manager-name-button');
const optionList = $('#option-list');
const logoutButton = $('#logout');

managerNameButton.textContent = userData.user.name[0];

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
  sessionStore.remove('user');
  location.href = './index.html';
}
