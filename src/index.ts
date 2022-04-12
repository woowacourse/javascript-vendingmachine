import 'regenerator-runtime';
import './css/index.css';
import View from './ts/views/View';
import VendingMachine from './ts/domains/VendingMachine';
import Router from './ts/router';
import auth from './ts/Auth.js';

import './ts/components/ToastNotification.ts';
import './ts/components/Signup.ts';
import './ts/components/Login.ts';
import './ts/components/ProfileEdit.ts';
import './ts/components/UserMenu.ts';

(async () => {
  await auth.checkUserLoginStatus();
  const vendingMachine = new VendingMachine();
  const view = new View(vendingMachine);
  new Router(view);
})();
