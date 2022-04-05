import './css/index.css';
import app from './ts/app';

window.addEventListener('DOMContentLoaded', () => {
  app.render();
});

window.addEventListener('hashchange', () => {
  app.render();
});
