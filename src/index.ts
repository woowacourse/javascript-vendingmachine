import 'regenerator-runtime';
import './css/index.css';
import View from './ts/views/View';
import VendingMachine from './ts/domains/VendingMachine';
import Router from './ts/router';
import auth from './ts/Auth.js';

import './ts/components/ToastNotification';
import './ts/components/Signup';
import './ts/components/Login';
import './ts/components/ProfileEdit';
import './ts/components/UserMenu';

(async () => {
  await auth.checkUserLoginStatus();
  const vendingMachine = new VendingMachine();
  const view = new View(vendingMachine);
  new Router(view);
})();
