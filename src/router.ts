import storage from './storage';
import { $, $$ } from './utils';

interface Router {
  path: string;
  component: Element;
}

const nav = document.querySelector('.nav');
const auth = document.querySelector('.auth');
const baseURL = '/javascript-vendingmachine';

nav.addEventListener('click', (e: MouseEvent & { target: HTMLElement }) => {
  historyRouterPush(e.target.getAttribute('route'));
});

auth.addEventListener('click', (e: MouseEvent & { target: HTMLElement }) => {
  if (e.target.tagName !== 'BUTTON') return;

  historyRouterPush(e.target.getAttribute('route'));
});

export const historyRouterPush = (pathname: string) => {
  history.pushState({ pathname }, '', pathname);
  render(pathname);
};

const render = (path: string) => {
  $$('.focus-button').forEach((button) => button.classList.remove('focus-button'));
  $(`[route='${path}']`, nav)?.classList.add('focus-button');

  const cur = routers.find((route) => route.path === path)?.component ?? $('product-management');
  const prevs = routers.filter((route) => route.path !== path);

  cur.classList.remove('hidden');
  prevs.forEach((p: Router) => p.component.classList.add('hidden'));
};

const routers: Router[] = [
  { path: baseURL + '/', component: $('product-management') },
  { path: baseURL + '/charge', component: $('charge-tab') },
  { path: baseURL + '/purchase', component: $('purchase-tab') },
  { path: baseURL + '/login', component: $('login-page') },
  { path: baseURL + '/signup', component: $('signup-page') },
  { path: baseURL + '/profile', component: $('profile-edit-page') },
];

window.addEventListener('popstate', function () {
  render(window.location.pathname);
});

if (window.location.pathname === '/') {
  window.location.pathname = baseURL;
}

render(window.location.pathname);

$('.signup-button').classList.add('hidden');
$('.login-button').classList.toggle('hidden', !!localStorage.getItem('accessToken'));
$('.user-name').classList.toggle('hidden', !localStorage.getItem('accessToken'));
$('.user-name').textContent = storage.getLocalStorage('user')
  ? storage.getLocalStorage('user').name.substring(0, 1)
  : '';
