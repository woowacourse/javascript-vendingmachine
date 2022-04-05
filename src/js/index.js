import '../css/index.css';
import './route/route.js';
import './controller.js';

const manager = JSON.parse(sessionStorage.getItem('user'));

if (manager) {
  location.href = './manager.html';
}

location.href = './#!purchase';
