import '../css/index.css';
import './route/route.js';
import './controller.js';
import { sessionStore } from './utils/storage';

const manager = sessionStore.get('user');

if (manager) {
  location.href = './manager.html';
}

location.href = './#!purchase';
