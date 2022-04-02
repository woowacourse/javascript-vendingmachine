import '../css/index.css';
import './route/route.js';
import './controller.js';

const { accessToken } = JSON.parse(localStorage.getItem('user'));

if (accessToken) {
  location.href = './manager.html';
}

location.href = '/#!purchase';
