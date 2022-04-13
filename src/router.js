import AuthStore from './domains/stores/AuthStore';
import { $, hideElement, showElement } from './utils';
import { BASE_HASH, ERROR_MESSAGE, HEADER } from './constants';

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
    hash: '#!user-info-modify',
    header: HEADER.USER_INFO_MODIFY,
    authorization: 'administrator',
    $container: $('user-info-modify'),
  },
  {
    hash: '#!product-manage',
    header: HEADER.VENDING_MACHINE,
    authorization: 'administrator',
    $button: $('.nav__product-manage-button'),
    $container: $('product-manage-container'),
    $focusInput: $('.product-name-input'),
  },
  {
    hash: '#!coin-charge',
    header: HEADER.VENDING_MACHINE,
    authorization: 'administrator',
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

const renderApp = (currentTarget) => {
  if (currentTarget.header === HEADER.VENDING_MACHINE) {
    $('#app').classList.remove('auth-app');
    showElement($('vending-machine'));

    return;
  }

  $('#app').classList.add('auth-app');
  hideElement($('vending-machine'));
};

const renderTargets = (currentTarget, prevTarget) => {
  if (currentTarget.authorization && !AuthStore.instance.isLoggedIn) {
    alert(ERROR_MESSAGE.AUTH.CANNOT_ACCESS);
    window.history.back();

    return;
  }

  currentTarget.$button?.classList.add('clicked');
  showElement(currentTarget.$container);
  currentTarget.$focusInput?.focus();

  if (!prevTarget) return;

  prevTarget.$button?.classList.remove('clicked');
  hideElement(prevTarget.$container);
};

window.location.hash = BASE_HASH;

window.onhashchange = (event) => {
  const currentHash = window.location.hash;
  const currentTarget = findTarget(currentHash);

  const prevHash = event.oldURL.replace(`${window.location.origin}/`, '');
  const prevTarget = findTarget(prevHash);

  renderApp(currentTarget);
  renderTargets(currentTarget, prevTarget);
};
