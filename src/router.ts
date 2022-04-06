import storage from './storage';
import { $, $$ } from './utils';

interface Router {
  path: string;
  component: Element;
}

const nav = document.querySelector('.nav');
const auth = document.querySelector('.auth');
const baseURL = '/javascript-vendingmachine';
const isLogin = !!localStorage.getItem('accessToken');

nav.addEventListener('click', (e: MouseEvent & { target: HTMLElement }) => {
  if (e.target.tagName !== 'BUTTON') return;

  historyRouterPush(e.target.getAttribute('route'));
});

auth.addEventListener('click', (e: MouseEvent & { target: HTMLElement }) => {
  if (e.target.tagName !== 'BUTTON') return;

  historyRouterPush(e.target.getAttribute('route'));
});

export const historyRouterPush = (pathname: string) => {
  history.pushState({ pathname }, '', pathname);

  renderPage(window.location.pathname);
  renderTab(window.location.pathname);
};

const renderPage = (path: string) => {
  pageRouters.forEach((router) => {
    if (router.path !== path) router.component.classList.add('hidden');
  });
  pageRouters.find((router) => router.path === path)?.component.classList.remove('hidden');
  auth.classList.add('hidden');

  if (path === baseURL + '/' || path === baseURL + '/charge' || path === baseURL + '/purchase') {
    $('vending-machine-page').classList.remove('hidden');
    auth.classList.remove('hidden');
  }
};

const renderTab = (path: string) => {
  $$('.focus-button').forEach((button) => button.classList.remove('focus-button'));
  $(`[route='${path}']`, nav)?.classList.add('focus-button');

  const cur = tabRouters.find((route) => route.path === path)?.component ?? $('product-management');
  const prevs = tabRouters.filter((route) => route.path !== path);

  cur.classList.remove('hidden');
  prevs.forEach((p: Router) => p.component.classList.add('hidden'));
};

const tabRouters: Router[] = [
  { path: baseURL + '/', component: $('product-management') },
  { path: baseURL + '/charge', component: $('charge-tab') },
  { path: baseURL + '/purchase', component: $('purchase-tab') },
];

const pageRouters: Router[] = [
  { path: baseURL + '/', component: $('vending-machine-page') },
  { path: baseURL + '/login', component: $('login-page') },
  { path: baseURL + '/signup', component: $('signup-page') },
  { path: baseURL + '/profile', component: $('profile-edit-page') },
];

window.addEventListener('popstate', function () {
  renderPage(window.location.pathname);
  renderTab(window.location.pathname);
});

if (window.location.pathname === '/') {
  window.location.pathname = baseURL;
}

renderPage(window.location.pathname);
renderTab(window.location.pathname);

const checkLogin = () => {
  $('.login-button').classList.toggle('hidden', isLogin);
  $('.user-name').classList.toggle('hidden', !isLogin);
  nav.classList.toggle('hidden', !isLogin);

  const userName = storage.getLocalStorage('user') ? storage.getLocalStorage('user').name : '';

  $('.user-name__menu-button').insertAdjacentHTML('afterbegin', userName.substring(0, 1));
};

window.addEventListener('DOMContentLoaded', () => {
  checkLogin();

  $('.user-name__menu-button').addEventListener('click', function () {
    $('.user-name__menu-button').classList.toggle('shadow');

    $('.menu-element.user-name__edit').classList.toggle('user-name__edit--move');
    $('.menu-element.user-name__logout').classList.toggle('user-name__logout--move');
  });
});
