import { $ } from '../utils/dom.js';
import { CATEGORY_TEMPLATE } from '../template.js';

const routes = {
  '/manage': CATEGORY_TEMPLATE.MANAGE,
  '/charge': CATEGORY_TEMPLATE.CHARGE,
  '/purchase': CATEGORY_TEMPLATE.PURCHASE,
};

window.onload = () => {
  const menuLinker = $('#menu__category');

  menuLinker.addEventListener('click', (e) => {
    if (e.target.tagName === 'LABEL') return;
    const pathName = e.target.closest('li').getAttribute('route');
    historyRouthPush(pathName, $('#section__container'));
  });
};

const historyRouthPush = (pathName, element) => {
  window.history.pushState({}, pathName, window.location.origin + pathName);
  renderHTML(element, routes[pathName]);
};

const renderHTML = (element, route) => {
  element.innerHTML = route;
};

window.onpopstate = () => {
  renderHTML($('#section__container'), routes[window.location.pathname]);
};
