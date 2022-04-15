import { ERROR_MESSAGE, BASE_URL } from './constants';
import { $, $$, showSnackbar } from './utils';

interface Route {
  path: string | string[];
  component: Element;
  permission: boolean;
  children?: Route[];
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
  const element = [...routes, ...routes[0].children].find((router) => router.path === pathname);

  if (!element) return;

  return element.permission || isLogin;
};

const restrictAccess = () => {
  showSnackbar(ERROR_MESSAGE.DENY);
  historyRouterPush(BASE_URL + '/');
};

export const historyRouterPush = (pathname: string) => {
  history.pushState({ pathname }, '', pathname);
  render(window.location.pathname);
};

const render = (path: string) => {
  if (!isGranted(path)) {
    restrictAccess();
    return;
  }

  routing(path);
};

const routing = (path: string) => {
  const targetRoute = routes.find((route) => route.path.includes(path));

  routes.forEach((route) => route.component.classList.toggle('hidden', route.path !== path));
  targetRoute.component.classList.remove('hidden');

  auth.classList.toggle('hidden', !!!targetRoute.children);
  targetRoute.children?.forEach((tab) => tab.component.classList.toggle('hidden', tab.path !== path));

  $$('.focus-button').forEach((button) => button.classList.remove('focus-button'));
  $(`[route='${path}']`, nav)?.classList.add('focus-button');
};

const routes: Route[] = [
  {
    path: [BASE_URL + '/', BASE_URL + '/charge', BASE_URL + '/management'],
    component: $('vending-machine-page'),
    permission: true,
    children: [
      { path: BASE_URL + '/', component: $('purchase-tab'), permission: true },
      { path: BASE_URL + '/charge', component: $('charge-tab'), permission: false },
      { path: BASE_URL + '/management', component: $('product-management-tab'), permission: false },
    ],
  },
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
