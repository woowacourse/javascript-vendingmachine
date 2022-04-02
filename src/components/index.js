import router, { ROUTE_NAME } from '../lib/router';
import globalStore from '../stores/globalStore';
import { ACTION_TYPES, GLOBAL_STATE_KEYS } from '../utils/constants';
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
    /** 초기렌더링 인자들 미리 받아서 지역변수화 할까?
     *
     */
    this.render(
      globalStore.getState(GLOBAL_STATE_KEYS.AUTH_INFORMATION, this),
      globalStore.getState(GLOBAL_STATE_KEYS.CURRENT_ROUTE_NAME, this),
    );
  }

  initDOM() {
    this.$navTab = document.querySelector('#tab-nav');
    this.$loginButton = document.querySelector('#login-button');
  }

  bindEventHandler() {
    window.addEventListener('popstate', this.onPopState);

    this.$navTab.addEventListener('click', this.onClickNavigation);
    this.$loginButton.addEventListener('click', this.onClickLoginOrEditButton);
  }

  subscribeStore() {
    globalStore.subscribe(GLOBAL_STATE_KEYS.CURRENT_ROUTE_NAME, this);
    globalStore.subscribe(GLOBAL_STATE_KEYS.AUTH_INFORMATION, this);
  }

  wakeUp() {
    const authInformation = globalStore.getState(GLOBAL_STATE_KEYS.AUTH_INFORMATION, this);
    const currentRouteName = globalStore.getState(GLOBAL_STATE_KEYS.CURRENT_ROUTE_NAME, this);
    this.render(authInformation, currentRouteName);
    // if (stateKey === GLOBAL_STATE_KEYS.CURRENT_ROUTE_NAME) {
    //   this.renderCurrentPage(globalStore.getState(stateKey, this));
    // }
    // if (stateKey === GLOBAL_STATE_KEYS.AUTH_INFORMATION) {
    //   this.renderLoginButton(globalStore.getState(stateKey, this));
    // }
  }

  render(authInformation, currentRouteName) {
    const { loggedUser, isLoggedIn } = authInformation;

    Object.entries(this.routerComponent).forEach(([routeName, component]) => {
      if (routeName === currentRouteName) {
        component.showSection(isLoggedIn);
        return;
      }
      component.hideSection();
    });

    if (loggedUser) {
      this.$loginButton.classList.add('profile');
      this.$loginButton.textContent = loggedUser.name.slice(0, 1);
      return;
    }
    this.$loginButton.classList.remove('profile');
    this.$loginButton.textContent = '로그인';
  }

  // renderCurrentPage(currentRouteName) {
  //   Object.entries(this.routerComponent).forEach(([routeName, component]) => {
  //     if (routeName === currentRouteName) {
  //       component.showSection(currentRouteName);
  //       return;
  //     }
  //     component.hideSection();
  //   });
  // }

  // renderLoginButton(authInformation) {
  //   const { loggedUser } = authInformation;
  //   if (loggedUser) {
  //     this.$loginButton.classList.add('profile');
  //     this.$loginButton.textContent = loggedUser.name.slice(0, 1);
  //     return;
  //   }
  //   this.$loginButton.classList.remove('profile');
  //   this.$loginButton.textContent = '로그인';
  // }

  onClickNavigation = e => {
    const {
      target: { id },
    } = e;

    if (id === 'manage-product-tab') {
      router.pushState({ path: ROUTE_NAME.MANAGE }, ROUTE_NAME.MANAGE);

      globalStore.mutateState({
        actionType: ACTION_TYPES.CHANGE_ROUTE,
        payload: {
          currentRouteName: ROUTE_NAME.MANAGE,
        },
        stateKey: GLOBAL_STATE_KEYS.CURRENT_ROUTE_NAME,
      });
    }

    if (id === 'recharge-change-tab') {
      router.pushState({ path: ROUTE_NAME.RECHARGE }, ROUTE_NAME.RECHARGE);

      globalStore.mutateState({
        actionType: ACTION_TYPES.CHANGE_ROUTE,
        payload: {
          currentRouteName: ROUTE_NAME.RECHARGE,
        },
        stateKey: GLOBAL_STATE_KEYS.CURRENT_ROUTE_NAME,
      });
    }

    if (id === 'purchase-product-tab') {
      router.pushState({ path: ROUTE_NAME.PURCHASE }, ROUTE_NAME.PURCHASE);

      globalStore.mutateState({
        actionType: ACTION_TYPES.CHANGE_ROUTE,
        payload: {
          currentRouteName: ROUTE_NAME.PURCHASE,
        },
        stateKey: GLOBAL_STATE_KEYS.CURRENT_ROUTE_NAME,
      });
    }
  };

  onClickLoginOrEditButton = e => {
    const {
      target: { className },
    } = e;
    const nextRouteName = className.includes('profile') ? ROUTE_NAME.EDIT : ROUTE_NAME.LOGIN;

    router.pushState({ path: nextRouteName }, nextRouteName);
    globalStore.mutateState({
      actionType: ACTION_TYPES.CHANGE_ROUTE,
      payload: {
        currentRouteName: nextRouteName,
      },
      stateKey: GLOBAL_STATE_KEYS.CURRENT_ROUTE_NAME,
    });
  };

  onPopState = e => {
    const { state } = e;

    globalStore.mutateState({
      actionType: ACTION_TYPES.CHANGE_ROUTE,
      payload: { currentRouteName: state?.path ?? ROUTE_NAME.MANAGE },
      stateKey: GLOBAL_STATE_KEYS.CURRENT_ROUTE_NAME,
    });
  };
}
export default AppComponent;
