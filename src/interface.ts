import { ELEMENT_KEY } from './constants';
import Authentication from './domain/Authentication';
import VendingMachine from './domain/VendingMachine';
import { $ } from './utils';

class Interface {
  private vendingMachine: VendingMachine;
  private authentication: Authentication;

  constructor(vendingMachine: VendingMachine, authentication: Authentication) {
    this.vendingMachine = vendingMachine;
    this.authentication = authentication;
  }

  bridge() {
    $('login-page').inject(this.authentication, ELEMENT_KEY.LOGIN);
    $('profile-edit-page').inject(this.authentication, ELEMENT_KEY.PROFILE_EDIT);
    $('signup-page').inject(this.authentication, ELEMENT_KEY.SIGNUP);

    $('product-management-tab').inject(this.vendingMachine, ELEMENT_KEY.PRODUCT);
    $('charge-tab').inject(this.vendingMachine, ELEMENT_KEY.CHARGE);
    $('purchase-tab').inject(this.vendingMachine, ELEMENT_KEY.PURCHASE);

    $('user-menu').inject(this.authentication, ELEMENT_KEY.USER_MENU);
  }
}

new Interface(new VendingMachine(), new Authentication()).bridge();
