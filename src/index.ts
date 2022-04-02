import './css/index.css';
// import checkRoute from './ts/app';
import app from './ts/app';

window.addEventListener('DOMContentLoaded', () => {
  app.checkRoute();
});

window.addEventListener('popstate', () => {
  app.checkRoute();
});
