import { $ } from './utils/dom';

const $nav = document.querySelector('nav');
const $productManageContainer = $('product-manage-container');
const $coinChargeContainer = $('coin-charge-container');
const $productPurchaseContainer = $('product-purchase-container');
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
