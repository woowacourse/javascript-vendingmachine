import { $, $$ } from './utils';

interface IRouter {
  path: string;
  component: Element;
}

const nav = document.querySelector('.nav');
const baseURL = '/javascript-vendingmachine';

nav.addEventListener('click', (e) => {
  if ((e.target as HTMLButtonElement).type === undefined) return;

  const route = (e.target as HTMLButtonElement).getAttribute('route');
  historyRouterPush(route);
});

const historyRouterPush = (pathname: string) => {
  if (pathname === window.location.pathname) return;

  history.pushState({ pathname }, '', pathname);
  render(pathname);
};

const render = (path: string) => {
  $$('.focus-button').forEach((button) => button.classList.remove('focus-button'));
  $(`[route='${path}']`, nav)?.classList.add('focus-button');

  const currentComponent = routers.find((route) => route.path === path)?.component ?? $('product-management');
  const prevRoute = routers.filter((route) => route.path !== path);

  currentComponent.classList.remove('hidden');
  prevRoute.forEach((router: IRouter) => router.component.classList.add('hidden'));
};

const routers: IRouter[] = [
  { path: baseURL + '/', component: $('product-management') },
  { path: baseURL + '/charge', component: $('charge-tab') },
];

window.addEventListener('popstate', function () {
  render(window.location.pathname);
});

if (window.location.pathname === '/') {
  window.location.pathname = baseURL + '/';
}

render(window.location.pathname);
