import { $ } from './utils/dom';

const $nav = document.querySelector('nav');
const $productManageContainer = $('product-manage-container');
const $coinChargeContainer = $('coin-charge-container');

const routes = [
  { hash: '#!product-manage', target: $productManageContainer },
  { hash: '#!coin-charge', target: $coinChargeContainer },
];

const renderTargetContainer = (currentHash) => {
  routes.forEach(({ hash, target }) => {
    const $menu = $nav.querySelector(`[href='${hash}']`);
    if (currentHash === hash) {
      target.show();
      $menu.querySelector('button').classList.add('clicked');
      target.querySelector('input').focus();
      return;
    }
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
