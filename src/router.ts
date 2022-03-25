import { $, $$ } from './utils';

interface IRouter {
  path: string;
  component: Element;
}

const nav = document.querySelector('.nav');

nav.addEventListener('click', (e) => {
  historyRouterPush((e.target as HTMLElement).getAttribute('route'));
});

const historyRouterPush = (pathname: string) => {
  history.pushState({ pathname }, '', pathname);
  render(pathname);
};

const render = (path: string) => {
  $$('.focus-button').forEach((button) => button.classList.remove('focus-button'));
  $(`[route='${path}']`, nav)?.classList.add('focus-button');

  const cur = routers.find((route) => route.path === path)?.component ?? $('product-management');
  const prevs = routers.filter((route) => route.path !== path);

  cur.classList.remove('hidden');
  prevs.forEach((p: IRouter) => p.component.classList.add('hidden'));
};

const routers: IRouter[] = [
  { path: '/javascript-vendingmachine/', component: $('product-management') },
  { path: '/javascript-vendingmachine/charge', component: $('charge-tab') },
];

window.addEventListener('popstate', function () {
  render(window.location.pathname);
});

render(window.location.pathname);
