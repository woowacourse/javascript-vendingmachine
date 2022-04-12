import storage from './storage';
import { $, $$ } from './utils';

const $nav = $('.nav');
const $loginButton = $('.login-button');
const $selectBoxWrapper = $('.select-box-wrapper');
const $userInfoButton = $('.user-info-button');
const $selectBox = $('.select-box');
const $purchaseTab = $('purchase-tab');
const $header = $('.header');
const $signInPage = $('sign-in');
const $signUpPage = $('sign-up');
const $editProfilePage = $('edit-profile');

const baseURL = '/javascript-vendingmachine';

export type Path =
  | '/javascript-vendingmachine/'
  | '/javascript-vendingmachine/charge'
  | '/javascript-vendingmachine/purchase'
  | '/javascript-vendingmachine/signin'
  | '/javascript-vendingmachine/logout'
  | '/javascript-vendingmachine/signup'
  | '/javascript-vendingmachine/editprofile';

interface IRouter {
  path: Path;
  component: Element;
}

export const historyRouterPush = (pathname: Path) => {
  if (pathname === window.location.pathname) return;
  if (pathname === '/javascript-vendingmachine/logout') pathname = '/javascript-vendingmachine/';
  history.pushState({ pathname }, '', pathname);
  render(pathname);
};

const accessTokenTabRender = (tabName) => {
  $(tabName).classList.remove('hidden');
  $nav.classList.remove('hidden');
  $loginButton.classList.add('hidden');
  $selectBoxWrapper.classList.remove('hidden');
  $selectBox.classList.add('hidden');
  $userInfoButton.classList.remove('hidden');
  $userInfoButton.textContent = storage.getUserInfo().userName.slice(0, 1);
};

const noAccessTokenTabRender = () => {
  $nav.classList.add('hidden');
  $loginButton.classList.remove('hidden');
  $purchaseTab.classList.remove('hidden');
};

const authCommonRender = () => {
  $selectBoxWrapper.classList.add('hidden');
  $header.classList.add('hidden');
  $nav.classList.add('hidden');
};

const render = (path: Path) => {
  $$('.focus-button').forEach((button) => button.classList.remove('focus-button'));
  $(`[route='${path}']`, $nav)?.classList.add('focus-button');

  switch (path) {
    case `${baseURL}/`:
      $header.classList.remove('hidden');
      if (storage.getAccessToken()) {
        accessTokenTabRender('product-management');
      } else {
        noAccessTokenTabRender();
      }
      break;

    case `${baseURL}/charge`:
      $header.classList.remove('hidden');
      if (storage.getAccessToken()) {
        accessTokenTabRender('charge-tab');
      } else {
        noAccessTokenTabRender();
      }
      break;

    case `${baseURL}/purchase`:
      $header.classList.remove('hidden');
      if (storage.getAccessToken()) {
        accessTokenTabRender('purchase-tab');
      } else {
        noAccessTokenTabRender();
      }
      break;

    case `${baseURL}/signin`:
      authCommonRender();
      $loginButton.classList.add('hidden');
      $signInPage.classList.remove('hidden');
      break;

    case `${baseURL}/signup`:
      authCommonRender();
      $signUpPage.classList.remove('hidden');
      break;

    case `${baseURL}/editprofile`:
      if (storage.getAccessToken()) {
        authCommonRender();
        $editProfilePage.classList.remove('hidden');
      } else {
        $nav.classList.add('hidden');
        $loginButton.classList.remove('hidden');
        $purchaseTab.classList.remove('hidden');
      }
      break;
  }

  if (
    !storage.getAccessToken() &&
    (path === `${baseURL}/` || path === `${baseURL}/charge` || path === `${baseURL}/editprofile`)
  ) {
    const prevRoute = routers.filter((route) => route.path !== `${baseURL}/purchase`);
    prevRoute.forEach((router: IRouter) => router.component.classList.add('hidden'));
    return;
  }

  const prevRoute = routers.filter((route) => route.path !== path);
  prevRoute.forEach((router: IRouter) => router.component.classList.add('hidden'));
};

const routers: IRouter[] = [
  { path: `${baseURL}/`, component: $('product-management') },
  { path: `${baseURL}/charge`, component: $('charge-tab') },
  { path: `${baseURL}/purchase`, component: $('purchase-tab') },
  { path: `${baseURL}/signin`, component: $('sign-in') },
  { path: `${baseURL}/signup`, component: $('sign-up') },
  { path: `${baseURL}/editprofile`, component: $('edit-profile') },
];

window.addEventListener('popstate', function () {
  render(window.location.pathname as Path);
});

if (window.location.pathname === '/') {
  window.location.pathname = `${baseURL}/`;
}

render(window.location.pathname as Path);
