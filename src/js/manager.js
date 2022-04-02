import '../css/index.css';
import './route/route.js';
import './controller.js';
import { $ } from './utils/dom';

const { accessToken, user } = JSON.parse(localStorage.getItem('user'));

if (!accessToken) {
  location.href = './index.html';
}

const managerName = $('#manager-name');
managerName.textContent = user.name.substr(0, 1);
