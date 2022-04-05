import { $, $$ } from './utils';

type Path = '/javascript-vendingmachine/' | '/javascript-vendingmachine/charge' | '/javascript-vendingmachine/purchase';

interface IRouter {
  path: Path;
  component: Element;
}

const nav = $('.nav');
const baseURL = '/javascript-vendingmachine';

nav.addEventListener('click', (e) => {
  if ((e.target as HTMLButtonElement).type === undefined) return;

  const route = (e.target as HTMLButtonElement).getAttribute('route') as Path;
  historyRouterPush(route);
});

const historyRouterPush = (pathname: Path) => {
  if (pathname === window.location.pathname) return;

  history.pushState({ pathname }, '', pathname);
  render(pathname);
};

const render = (path: Path) => {
  $$('.focus-button').forEach((button) => button.classList.remove('focus-button'));
  $(`[route='${path}']`, nav)?.classList.add('focus-button');

  const currentComponent = routers.find((route) => route.path === path)?.component ?? $('product-management');
  const prevRoute = routers.filter((route) => route.path !== path);

  currentComponent.classList.remove('hidden');
  prevRoute.forEach((router: IRouter) => router.component.classList.add('hidden'));
};

const routers: IRouter[] = [
  { path: `${baseURL}/`, component: $('product-management') },
  { path: `${baseURL}/charge`, component: $('charge-tab') },
  { path: `${baseURL}/purchase`, component: $('purchase-tab') },
];

window.addEventListener('popstate', function () {
  render(window.location.pathname as Path);
});

if (window.location.pathname === '/') {
  window.location.pathname = baseURL + '/';
}

render(window.location.pathname as Path);
