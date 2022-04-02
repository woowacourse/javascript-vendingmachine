import '../css/index.css';
import './route/route.js';
import Controller from './Controller.js';
import { $ } from './utils/dom';

const managerName = $('#manager-name');
const { user } = JSON.parse(localStorage.getItem('user'));
managerName.textContent = user.name.substr(0, 1);

new Controller();
