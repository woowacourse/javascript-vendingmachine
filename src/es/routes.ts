import { $ } from './utils';

import HeaderView from './view/HeaderView';
import LoginPageView from './view/LoginPageView';
import SignUpPageView from './view/SignUpPageView';
import UpdateMyInfoPageView from './view/UpdateMyInfoPageView';
import ProductManagementPageView from './view/ProductManagementPageView';
import VendingMachineChargeManagementPageView from './view/VendingMachineChargeManagementPageView';
import ProductPurchasePageView from './view/ProductPurchasePageView';
import User from './state/User';

const path = location.pathname.slice(0, -1);

const loadPageMethods = {
  login: LoginPageView.loadPage,
  signUp: SignUpPageView.loadPage,
  updateMyInfo: UpdateMyInfoPageView.loadPage,
  productManagement: ProductManagementPageView.loadPage,
  vendingMachineChargeManagement: VendingMachineChargeManagementPageView.loadPage,
  productPurchase: ProductPurchasePageView.loadPage,
};

function loadPage(page) {
  HeaderView.updateOnPageChange(page);
  loadPageMethods[page]();

  const paramsObject = { page };
  const params = new URLSearchParams(paramsObject);
  history.pushState(paramsObject, '', `${path}?${params.toString()}`);
}

const loadMainPage = () => {
  const mainPage = User.isMember ? 'productManagement' : 'productPurchase';
  loadPage(mainPage);
};

function loadCurrentPage() {
  const currentParams = (new URL(location.href)).searchParams;
  const currentPage = currentParams.get('page');
  if (currentPage) {
    loadPage(currentPage);
    return;
  }
  loadMainPage();
}

function initRouteEvent() {
  $('#app').addEventListener('click', event => {
    const { page } = event.target.dataset;
    if (!page) return;

    if (page === 'main') {
      loadMainPage();
      return;
    }
    loadPage(page);
  });
}

export {
  initRouteEvent,
  loadCurrentPage,
  loadMainPage,
};
