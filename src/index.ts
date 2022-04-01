import './css/index.css';
// import checkRoute from './ts/app';
import app from './ts/app';

addEventListener('DOMContentLoaded', () => {
  app.checkRoute();
});

addEventListener('popstate', () => {
  app.checkRoute();
});
