import router, { ROUTE_NAME } from '../lib/router';
import globalStore from '../stores/globalStore';
import { GLOBAL_STATE_KEYS } from '../utils/constants';
import EditComponent from './auth/EditComponent';
import JoinComponent from './auth/JoinComponent';
import LoginComponent from './auth/LoginComponent';
import ManageComponent from './vendingMachine/ManageComponent';
import PurchaseComponent from './vendingMachine/PurchaseComponent';
import RechargeComponent from './vendingMachine/RechargeComponent';

class AppComponent {
  routerComponent = {
    [ROUTE_NAME.MANAGE]: new ManageComponent(),
    [ROUTE_NAME.RECHARGE]: new RechargeComponent(),
    [ROUTE_NAME.PURCHASE]: new PurchaseComponent(),
    [ROUTE_NAME.LOGIN]: new LoginComponent(),
    [ROUTE_NAME.JOIN]: new JoinComponent(),
    [ROUTE_NAME.EDIT]: new EditComponent(),
  };

  constructor() {
    this.initDOM();
    this.bindEventHandler();
    this.subscribeStore();
    this.render(globalStore.getState(GLOBAL_STATE_KEYS.CURRENT_ROUTE_NAME, this));
  }

  initDOM() {
    this.$navTab = document.querySelector('#tab-nav');
    this.$loginButton = document.querySelector('#login-button');
  }

  bindEventHandler() {
    this.$navTab.addEventListener('click', this.onClickNavigation);
    this.$loginButton.addEventListener('click', this.onClickLoginOrEditButton);
  }

  subscribeStore() {
    globalStore.subscribe(GLOBAL_STATE_KEYS.CURRENT_ROUTE_NAME, this);
  }

  wakeUp() {
    const currentRouteName = globalStore.getState(GLOBAL_STATE_KEYS.CURRENT_ROUTE_NAME, this);
    this.render(currentRouteName);
  }

  render(currentRouteName) {
    Object.entries(this.routerComponent).forEach(([routeName, component]) => {
      if (routeName === currentRouteName) {
        component.showSection(currentRouteName);
        return;
      }
      component.hideSection();
    });
  }

  onClickNavigation = e => {
    const {
      target: { id },
    } = e;

    if (id === 'manage-product-tab') {
      router.pushState({ path: ROUTE_NAME.MANAGE }, 'home');
    }
    if (id === 'recharge-change-tab') {
      router.pushState({ path: ROUTE_NAME.RECHARGE }, 'recharge');
    }
    if (id === 'purchase-product-tab') {
      router.pushState({ path: ROUTE_NAME.PURCHASE }, 'purchase');
    }
  };

  onClickLoginOrEditButton = () => {
    router.pushState({ path: ROUTE_NAME.LOGIN }, 'login');
  };
}
export default AppComponent;
