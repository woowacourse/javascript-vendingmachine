import { $ } from './utils';

const targets = [
  {
    hash: '#!product-manage',
    $button: $('.nav__product-manage-button'),
    $container: $('product-manage-container'),
    $focusInput: $('.product-name-input'),
  },
  {
    hash: '#!coin-charge',
    $button: $('.nav__coin-charge-button'),
    $container: $('coin-charge-container'),
    $focusInput: $('#machine-money-input'),
  },
  {
    hash: '#!product-purchase',
    $button: $('.nav__product-purchase-button'),
    $container: $('product-purchase-container'),
    $focusInput: $('#customer-money-input'),
  },
];

const findTarget = (hash) => {
  return targets.find((target) => target.hash === hash);
};

const renderTargets = (currentTarget, prevTarget) => {
  currentTarget.$button.classList.add('clicked');
  currentTarget.$container.classList.add('container');
  currentTarget.$container.show();
  currentTarget.$focusInput.focus();

  if (!prevTarget) return;

  prevTarget.$button.classList.remove('clicked');
  prevTarget.$container.classList.remove('container');
  prevTarget.$container.hide();
};

window.location.hash = '#!product-purchase';

window.onhashchange = (event) => {
  const currentHash = window.location.hash;
  const currentTarget = findTarget(currentHash);

  const prevHash = event.oldURL.replace(`${window.location.origin}/`, '');
  const prevTarget = findTarget(prevHash);

  renderTargets(currentTarget, prevTarget);
};
