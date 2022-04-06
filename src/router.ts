import { $, $$, showSnackbar } from './utils';

interface Router {
  path: string;
  component: Element;
  permission: boolean;
}

const nav = $('.nav');
const auth = $('.auth');
const baseURL = '/javascript-vendingmachine';

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
  showSnackbar('로그인 후 이용할 수 있습니다.');
  historyRouterPush(baseURL + '/');
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
    path === baseURL + '/' || path === baseURL + '/charge' || path === baseURL + '/management';

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
  { path: baseURL + '/', component: $('purchase-tab'), permission: true },
  { path: baseURL + '/charge', component: $('charge-tab'), permission: false },
  { path: baseURL + '/management', component: $('product-management'), permission: false },
];

const pageRouters: Router[] = [
  { path: baseURL + '/', component: $('vending-machine-page'), permission: true },
  { path: baseURL + '/login', component: $('login-page'), permission: true },
  { path: baseURL + '/signup', component: $('signup-page'), permission: true },
  { path: baseURL + '/profile', component: $('profile-edit-page'), permission: false },
];

window.addEventListener('popstate', function () {
  render(window.location.pathname);
});

if (window.location.pathname === '/') {
  window.location.pathname = baseURL;
}

render(window.location.pathname);
