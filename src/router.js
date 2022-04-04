import { $ } from './utils';
import { BASE_URL } from './constants';

const targets = [
  {
    route: `${BASE_URL}/`,
    $button: $('.nav__product-manage-button'),
    $container: $('product-manage-container'),
    $focusInput: $('.product-name-input'),
  },
  {
    route: `${BASE_URL}/coin-charge/`,
    $button: $('.nav__coin-charge-button'),
    $container: $('coin-charge-container'),
    $focusInput: $('#coin-input'),
  },
  {
    route: `${BASE_URL}/product-purchase/`,
    $button: $('.nav__product-purchase-button'),
    $container: $('product-purchase-container'),
    $focusInput: $('#money-input'),
  },
];

const findTarget = (route) => {
  return targets.find((target) => target.route === route);
};

const render = (currentTarget, prevTarget) => {
  currentTarget.$button.classList.add('clicked');
  currentTarget.$container.classList.add('container');
  currentTarget.$container.show();
  currentTarget.$focusInput.focus();

  if (!prevTarget) return;

  prevTarget.$button.classList.remove('clicked');
  prevTarget.$container.classList.remove('container');
  prevTarget.$container.hide();
};

const handleAdministratorMenuClick = (event) => {
  if (event.target.classList.contains('clicked')) return;

  const currentRoute = event.target.getAttribute('route');
  const currentTarget = findTarget(currentRoute);
  const prevRoute = window.location.pathname;
  const prevTarget = findTarget(prevRoute);

  if (!window.history.state) {
    window.history.pushState({ prevRoute: currentRoute }, null, prevRoute);
  }

  window.history.pushState({ prevRoute }, null, currentRoute);

  render(currentTarget, prevTarget);
};

render(findTarget(window.location.pathname));

$('nav', $('administrator-menu')).addEventListener('click', handleAdministratorMenuClick);

window.addEventListener('popstate', (event) => {
  const currentTarget = findTarget(window.location.pathname);
  const prevTarget = findTarget(event.state.prevRoute);

  render(currentTarget, prevTarget);
});
