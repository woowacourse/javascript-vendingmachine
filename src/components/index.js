import router from '../router';
import { AUTH_ROUTE_NAME, VENDING_MACHINE_ROUTE_NAME } from '../utils/constants';
import AuthComponent from './AuthComponent';
import VendingMachineComponent from './VendingMachineComponent';

class AppComponent {
  #currentSectionName;

  #VendingMachineComponent;
  #AuthComponent;

  constructor(currentRouteName) {
    this.#VendingMachineComponent = new VendingMachineComponent({
      onClickNavigation: this.onClickNavigation,
    });
    this.#AuthComponent = new AuthComponent({
      onClickLoginOrEditButton: this.onClickLoginOrEditButton,
      onClickJoinButton: this.onClickJoinButton,
    });
    this.showSection(currentRouteName);
  }

  onClickNavigation = e => {
    const {
      target: { id },
    } = e;

    if (
      id === 'manage-product-tab' &&
      this.#currentSectionName !== VENDING_MACHINE_ROUTE_NAME.MANAGE
    ) {
      router.pushState({ path: VENDING_MACHINE_ROUTE_NAME.MANAGE }, 'home');
      this.showSection(VENDING_MACHINE_ROUTE_NAME.MANAGE);
    }
    if (
      id === 'recharge-change-tab' &&
      this.#currentSectionName !== VENDING_MACHINE_ROUTE_NAME.RECHARGE
    ) {
      router.pushState({ path: VENDING_MACHINE_ROUTE_NAME.RECHARGE }, 'recharge');
      this.showSection(VENDING_MACHINE_ROUTE_NAME.RECHARGE);
    }
    if (
      id === 'purchase-product-tab' &&
      this.#currentSectionName !== VENDING_MACHINE_ROUTE_NAME.PURCHASE
    ) {
      router.pushState({ path: VENDING_MACHINE_ROUTE_NAME.PURCHASE }, 'purchase');
      this.showSection(VENDING_MACHINE_ROUTE_NAME.PURCHASE);
    }
  };

  onClickLoginOrEditButton = () => {
    router.pushState({ path: AUTH_ROUTE_NAME.LOGIN }, 'login');
    this.showSection(AUTH_ROUTE_NAME.LOGIN);
  };

  onClickJoinButton = () => {
    router.pushState({ path: AUTH_ROUTE_NAME.JOIN }, 'join');
    this.showSection(AUTH_ROUTE_NAME.JOIN);
  };

  showSection(name) {
    if (Object.values(VENDING_MACHINE_ROUTE_NAME).includes(name)) {
      this.#AuthComponent.hide();
      this.#VendingMachineComponent.showSection(name);
    }
    if (Object.values(AUTH_ROUTE_NAME).includes(name)) {
      this.#VendingMachineComponent.hide();
      this.#AuthComponent.showSection(name);
    }
  }
}
export default AppComponent;
