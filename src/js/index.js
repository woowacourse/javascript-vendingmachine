import '../css/index.css';
import './route/route.js';
import './controller.js';
import { getSessionStorage } from './utils/sessionStorage';

const manager = getSessionStorage('user');

if (manager) {
  location.href = './manager.html';
}

location.href = './#!purchase';
