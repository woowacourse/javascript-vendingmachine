import './css/index.css';
import View from './ts/view/View';
import VendingMachine from './ts/domain/VendingMachine';
import Router from './ts/router';

import './ts/components/ToastNotification';
import './ts/components/Signup';
import './ts/components/Login';
import './ts/components/ProfileEdit';
import './ts/components/UserMenu';

const vendingMachine = new VendingMachine();
const view = new View(vendingMachine);
new Router(view);
