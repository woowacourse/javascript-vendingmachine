import { $ } from './utils/dom';

const $userMenuContainer = document.querySelector('#user-menu-container');
const $nav = document.querySelector('nav');
const $productManageContainer = $('product-manage-container');
const $coinChargeContainer = $('coin-charge-container');
const $productPurchaseContainer = $('product-purchase-container');
const $loginContainer = $('login-container');
const $signupContainer = $('signup-container');
const $app = $('#app');

const routes = [
  { hash: '#!product-manage', target: $productManageContainer, isLongApp: false },
  { hash: '#!coin-charge', target: $coinChargeContainer, isLongApp: false },
  { hash: '#!product-purchase', target: $productPurchaseContainer, isLongApp: true },
];

const renderAppHeight = (isLongApp) => {
  if (isLongApp) {
    $app.classList.remove('short-app');
    $app.classList.add('long-app');
    return;
  }
  $app.classList.add('short-app');
  $app.classList.remove('long-app');
};

const renderTargetContainer = (currentHash) => {
  if (currentHash === '#!signup') {
    $loginContainer.hide();
    $signupContainer.show();
    $userMenuContainer.setAttribute('hidden', true);
    renderAppHeight(false);
    return;
  }
  if (currentHash === '#!login') {
    $loginContainer.show();
    $signupContainer.hide();
    $userMenuContainer.setAttribute('hidden', true);
    renderAppHeight(false);
    return;
  }

  routes.forEach(({ hash, target, isLongApp }) => {
    const $menu = $nav.querySelector(`[href='${hash}']`);
    if (currentHash === hash) {
      target.show();
      $menu.querySelector('button').classList.add('clicked');
      target.querySelector('input').focus();
      renderAppHeight(isLongApp);
      return;
    }
    $app.classList.remove('long-app');
    target.hide();
    $menu.querySelector('button').classList.remove('clicked');
  });
};

const renderInitContainer = (currentHash) => {
  renderTargetContainer(currentHash);
};

window.addEventListener('hashchange', () => {
  const currentHash = window.location.hash;
  renderTargetContainer(currentHash);
});

renderInitContainer(window.location.hash);
