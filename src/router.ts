import storage from './storage';
import { $, $$ } from './utils';

const nav = $('.nav');
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

const render = (path: Path) => {
  $$('.focus-button').forEach((button) => button.classList.remove('focus-button'));
  $(`[route='${path}']`, nav)?.classList.add('focus-button');

  switch (path) {
    case `${baseURL}/`:
      $('.header').classList.remove('hidden');
      if (storage.getAccessToken()) {
        $('.nav').classList.remove('hidden');
        $('.login-button').classList.add('hidden');
        $('product-management').classList.remove('hidden');
        $('.select-box-wrapper').classList.remove('hidden');
        $('.user-info-button').classList.remove('hidden');
        $('.select-box').classList.add('hidden');
        $('.user-info-button').textContent = storage.getUserInfo().userName.slice(0, 1);
      } else {
        $('.nav').classList.add('hidden');
        $('.login-button').classList.remove('hidden');
        $('purchase-tab').classList.remove('hidden');
      }
      break;
    case `${baseURL}/charge`:
      $('.header').classList.remove('hidden');
      if (storage.getAccessToken()) {
        $('.nav').classList.remove('hidden');
        $('.login-button').classList.add('hidden');
        $('charge-tab').classList.remove('hidden');
        $('.select-box-wrapper').classList.remove('hidden');
        $('.user-info-button').classList.remove('hidden');
        $('.select-box').classList.add('hidden');
        $('.user-info-button').textContent = storage.getUserInfo().userName.slice(0, 1);
      } else {
        $('.nav').classList.add('hidden');
        $('.login-button').classList.remove('hidden');
        $('purchase-tab').classList.remove('hidden');
      }
      break;
    case `${baseURL}/purchase`:
      $('.header').classList.remove('hidden');
      if (storage.getAccessToken()) {
        $('.nav').classList.remove('hidden');
        $('.login-button').classList.add('hidden');
        $('purchase-tab').classList.remove('hidden');
        $('.select-box-wrapper').classList.remove('hidden');
        $('.user-info-button').classList.remove('hidden');
        $('.select-box').classList.add('hidden');
        $('.user-info-button').textContent = storage.getUserInfo().userName.slice(0, 1);
      } else {
        $('.nav').classList.add('hidden');
        $('.login-button').classList.remove('hidden');
        $('purchase-tab').classList.remove('hidden');
      }
      break;
    case `${baseURL}/signin`:
      $('.select-box-wrapper').classList.add('hidden');
      $('.header').classList.add('hidden');
      $('.nav').classList.add('hidden');
      const signinComponent = $('sign-in');
      signinComponent.classList.remove('hidden');
      break;
    case `${baseURL}/signup`:
      $('.select-box-wrapper').classList.add('hidden');
      $('.header').classList.add('hidden');
      $('.nav').classList.add('hidden');
      const signupComponent = $('sign-up');
      signupComponent.classList.remove('hidden');
      break;
    case `${baseURL}/editprofile`:
      if (storage.getAccessToken()) {
        $('.select-box-wrapper').classList.add('hidden');
        $('.header').classList.add('hidden');
        $('.nav').classList.add('hidden');
        const editProfileComponent = $('edit-profile');
        editProfileComponent.classList.remove('hidden');
      } else {
        $('.nav').classList.add('hidden');
        $('.login-button').classList.remove('hidden');
        $('purchase-tab').classList.remove('hidden');
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
