import { ERROR_MESSAGE, BASE_URL } from './constants';
import { $, $$, showSnackbar } from './utils';

interface Router {
  path: string;
  component: Element;
  permission: boolean;
}

const nav = $('.nav');
const auth = $('.auth');

[nav, auth].forEach((container) =>
  container.addEventListener('click', (e: MouseEvent & { target: HTMLElement }) => {
    if (e.target.tagName !== 'BUTTON') return;

    historyRouterPush(e.target.getAttribute('route'));
  }),
);

const isGranted = (pathname: string) => {
  const isLogin = !!localStorage.getItem('accessToken');
  const element = [...pageRouters, ...tabRouters].find((router) => router.path === pathname);

  if (!element) return;

  return element.permission || isLogin;
};

const deny = () => {
  showSnackbar(ERROR_MESSAGE.DENY);
  historyRouterPush(BASE_URL + '/');
};

export const historyRouterPush = (pathname: string) => {
  history.pushState({ pathname }, '', pathname);
  render(window.location.pathname);
};

const render = (path: string) => {
  if (!isGranted(path)) {
    deny();
    return;
  }

  renderPage(window.location.pathname);
  renderTab(window.location.pathname);
};

const renderPage = (path: string) => {
  const isVendingMachinePage =
    path === BASE_URL + '/' || path === BASE_URL + '/charge' || path === BASE_URL + '/management';

  pageRouters.forEach((router) => router.component.classList.toggle('hidden', router.path !== path));
  pageRouters.find((router) => router.path === path)?.component.classList.remove('hidden');

  auth.classList.toggle('hidden', !isVendingMachinePage);
  $('vending-machine-page').classList.toggle('hidden', !isVendingMachinePage);
};

const renderTab = (path: string) => {
  $$('.focus-button').forEach((button) => button.classList.remove('focus-button'));
  $(`[route='${path}']`, nav)?.classList.add('focus-button');

  const cur = tabRouters.find((route) => route.path === path)?.component ?? $('purchase-tab');
  const prevs = tabRouters.filter((route) => route.path !== path);

  cur.classList.remove('hidden');
  prevs.forEach((p: Router) => p.component.classList.add('hidden'));
};

const tabRouters: Router[] = [
  { path: BASE_URL + '/', component: $('purchase-tab'), permission: true },
  { path: BASE_URL + '/charge', component: $('charge-tab'), permission: false },
  { path: BASE_URL + '/management', component: $('product-management'), permission: false },
];

const pageRouters: Router[] = [
  { path: BASE_URL + '/', component: $('vending-machine-page'), permission: true },
  { path: BASE_URL + '/login', component: $('login-page'), permission: true },
  { path: BASE_URL + '/signup', component: $('signup-page'), permission: true },
  { path: BASE_URL + '/profile', component: $('profile-edit-page'), permission: false },
];

window.addEventListener('popstate', function () {
  render(window.location.pathname);
});

if (window.location.pathname === '/') {
  window.location.pathname = BASE_URL;
}

render(window.location.pathname);
