import './css/app.css';
// 임시
import { Auth } from './domain/Auth';

import { NavView } from './view/NavView';

window.addEventListener('DOMContentLoaded', () => {
  new NavView();
  new Auth();
});
