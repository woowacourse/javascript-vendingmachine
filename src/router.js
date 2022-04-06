import { $ } from './utils';
import { BASE_HASH, HEADER } from './constants';

const targets = [
  {
    hash: '#!login',
    header: HEADER.LOGIN,
    $container: $('log-in'),
    $focusInput: $('#login-email'),
  },
  {
    hash: '#!signup',
    header: HEADER.SIGNUP,
    $container: $('sign-up'),
    $focusInput: $('#signup-email'),
  },
  {
    hash: '#!product-manage',
    header: HEADER.VENDING_MACHINE,
    $button: $('.nav__product-manage-button'),
    $container: $('product-manage-container'),
    $focusInput: $('.product-name-input'),
  },
  {
    hash: '#!coin-charge',
    header: HEADER.VENDING_MACHINE,
    $button: $('.nav__coin-charge-button'),
    $container: $('coin-charge-container'),
    $focusInput: $('#machine-money-input'),
  },
  {
    hash: '#!product-purchase',
    header: HEADER.VENDING_MACHINE,
    $button: $('.nav__product-purchase-button'),
    $container: $('product-purchase-container'),
    $focusInput: $('#customer-money-input'),
  },
];

const findTarget = (hash) => {
  return targets.find((target) => target.hash === hash);
};

const renderMenus = (currentTarget) => {
  $('#main-header').textContent = currentTarget.header;

  const $authMenu = $('auth-menu');
  const $administratorMenu = $('administrator-menu');

  if (currentTarget.header === HEADER.VENDING_MACHINE) {
    $authMenu.removeAttribute('hidden');
    $authMenu.classList.add('auth-menu');
    $administratorMenu.removeAttribute('hidden');

    return;
  }

  $authMenu.setAttribute('hidden', true);
  $authMenu.classList.remove('auth-menu');
  $administratorMenu.setAttribute('hidden', true);
};

const renderTargets = (currentTarget, prevTarget) => {
  currentTarget.$button?.classList.add('clicked');
  currentTarget.$container.classList.add('container');
  currentTarget.$container.show();
  currentTarget.$focusInput.focus();

  if (!prevTarget) return;

  prevTarget.$button?.classList.remove('clicked');
  prevTarget.$container.classList.remove('container');
  prevTarget.$container.hide();
};

window.location.hash = BASE_HASH;

window.onhashchange = (event) => {
  const currentHash = window.location.hash;
  const currentTarget = findTarget(currentHash);

  const prevHash = event.oldURL.replace(`${window.location.origin}/`, '');
  const prevTarget = findTarget(prevHash);

  renderMenus(currentTarget);
  renderTargets(currentTarget, prevTarget);
};
