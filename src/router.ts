import { $ } from './utils';

const nav = document.querySelector('.nav');

nav.addEventListener('click', (e: any) => {
  historyRouterPush(e.target.getAttribute('route'));
});

const historyRouterPush = (pathname) => {
  history.pushState({ pathname }, '', pathname);
  render(pathname);
};

const render = (path) => {
  const cur = routers.find((route) => route.path === path)?.component ?? $('product-management');
  const prevs = routers.filter((route) => route.path !== path);

  cur.classList.remove('hidden');
  prevs.forEach((p: any) => p.component.classList.add('hidden'));
};

const routers = [
  { path: '/', component: $('product-management') },
  { path: '/charge', component: $('charge-tab') },
];

window.addEventListener('popstate', function () {
  render(window.location.pathname);
});

render(window.location.pathname);
