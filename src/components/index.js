import { logoutUser } from '../business/auth';
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
    this.render(
      globalStore.getState(GLOBAL_STATE_KEYS.AUTH_INFORMATION, this),
      globalStore.getState(GLOBAL_STATE_KEYS.CURRENT_ROUTE_NAME, this),
    );
  }

  initDOM() {
    this.$navTab = document.querySelector('#tab-nav');
    this.$pageTitle = document.querySelector('#page-title');

    this.$loginButton = document.querySelector('#login-button');
    this.$logoutButton = document.querySelector('#logout-button');

    this.$applicationHeader = document.querySelector('#application-header');

    this.$manageTab = document.querySelector('#manage-product-tab');
    this.$rechargeTab = document.querySelector('#recharge-change-tab');
    this.$purchaseTab = document.querySelector('#purchase-product-tab');
  }

  bindEventHandler() {
    window.addEventListener('popstate', this.onPopState);

    this.$navTab.addEventListener('click', this.onClickNavigation);

    this.$loginButton.addEventListener('click', this.onClickLoginOrEditButton);
    this.$applicationHeader.addEventListener('click', this.onClickApplicationHeader);
    this.$logoutButton.addEventListener('click', this.onClickLogout);
  }

  subscribeStore() {
    globalStore.subscribe(GLOBAL_STATE_KEYS.CURRENT_ROUTE_NAME, this);
    globalStore.subscribe(GLOBAL_STATE_KEYS.AUTH_INFORMATION, this);
  }

  wakeUp() {
    const authInformation = globalStore.getState(GLOBAL_STATE_KEYS.AUTH_INFORMATION, this);
    const currentRouteName = globalStore.getState(GLOBAL_STATE_KEYS.CURRENT_ROUTE_NAME, this);
    this.render(authInformation, currentRouteName);
  }

  render(authInformation, currentRouteName) {
    const { loggedUser, isLoggedIn } = authInformation;

    this.#renderHeaderSection(currentRouteName);

    this.#renderLogoutButton(isLoggedIn);

    this.#renderChildComponents(isLoggedIn, currentRouteName);

    this.#renderLoginOrProfileButton(loggedUser);
  }

  /** loginButton, navTab, pageTitle 등 여러 페이지가 공유하는 DOM을 각 페이지에 맞게 조작하여 렌더링한다. */
  #renderHeaderSection(currentRouteName) {
    if (
      currentRouteName === ROUTE_NAME.MANAGE ||
      currentRouteName === ROUTE_NAME.RECHARGE ||
      currentRouteName === ROUTE_NAME.PURCHASE
    ) {
      this.$loginButton.classList.remove('hide');
      this.$navTab.classList.remove('hide');
      this.$pageTitle.textContent = '🍿 자판기 🍿';
      return;
    }

    this.$loginButton.classList.add('hide');
    this.$navTab.classList.add('hide');

    if (currentRouteName === ROUTE_NAME.LOGIN) {
      this.$pageTitle.textContent = '로그인';
    }

    if (currentRouteName === ROUTE_NAME.JOIN) {
      this.$pageTitle.textContent = '회원가입';
    }

    if (currentRouteName === ROUTE_NAME.EDIT) {
      this.$pageTitle.textContent = '정보수정';
    }
  }

  #renderLogoutButton(isLoggedIn) {
    if (isLoggedIn) {
      this.$logoutButton.classList.remove('hide');
      return;
    }
    this.$logoutButton.classList.add('hide');
  }

  #renderChildComponents(isLoggedIn, currentRouteName) {
    Object.entries(this.routerComponent).forEach(([routeName, component]) => {
      if (routeName === currentRouteName) {
        component.showSection(isLoggedIn);
        return;
      }
      component.hideSection();
    });
  }

  #renderLoginOrProfileButton(loggedUser) {
    if (loggedUser) {
      this.$loginButton.classList.add('profile');
      this.$loginButton.textContent = loggedUser.name.slice(0, 1);
      return;
    }
    this.$loginButton.classList.remove('profile');
    this.$loginButton.textContent = '로그인';
  }

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

  onClickApplicationHeader = () => {
    router.pushState({ path: ROUTE_NAME.MANAGE }, ROUTE_NAME.MANAGE);
    globalStore.mutateState({
      actionType: ACTION_TYPES.CHANGE_ROUTE,
      payload: {
        currentRouteName: ROUTE_NAME.MANAGE,
      },
      stateKey: GLOBAL_STATE_KEYS.CURRENT_ROUTE_NAME,
    });
  };

  onClickLogout = () => {
    logoutUser();

    router.pushState({ path: ROUTE_NAME.MANAGE }, ROUTE_NAME.MANAGE);

    globalStore.mutateState({
      actionType: ACTION_TYPES.CHANGE_ROUTE,
      payload: {
        currentRouteName: ROUTE_NAME.MANAGE,
      },
      stateKey: GLOBAL_STATE_KEYS.CURRENT_ROUTE_NAME,
    });
  };
}
export default AppComponent;
