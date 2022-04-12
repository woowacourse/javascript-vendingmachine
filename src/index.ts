import './css/index.css';
import checkRoute from './ts/app';

addEventListener('DOMContentLoaded', () => {
  checkRoute();
});

addEventListener('hashchange', () => {
  checkRoute();
});
