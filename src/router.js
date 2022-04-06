import { $ } from './utils/dom';

const $administratorMenu = document.querySelector('administrator-menu');
const $userManagerContainer = document.querySelector('#user-manager-container');
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

const routesAuth = [
  { hash: '#!signup', target: $signupContainer, isLongApp: false },
  { hash: '#!login', target: $loginContainer, isLongApp: false },
];

const moveToPage = (pageHash) => {
  window.location.replace(pageHash);
};

const renderAppHeight = (isLongApp) => {
  if (isLongApp) {
    $app.classList.remove('short-app');
    $app.classList.add('long-app');
    return;
  }
  $app.classList.add('short-app');
  $app.classList.remove('long-app');
};

const renderAuthContainer = (currentHash) => {
  $userManagerContainer.removeAttribute('hidden');

  routesAuth.forEach(({ hash, target, isLongApp }) => {
    if (currentHash === hash) {
      target.show();
      renderAppHeight(isLongApp);
      $userMenuContainer.setAttribute('hidden', true);
      return;
    }
    target.hide();
  });
};

const renderTargetContainer = (currentHash) => {
  // user-manager-container
  if (currentHash === '#!signup' || currentHash === '#!login') {
    renderAuthContainer(currentHash);
    return;
  }

  // user-menu-container
  $userManagerContainer.setAttribute('hidden', true);
  $userMenuContainer.removeAttribute('hidden');

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

export const renderManagerView = () => {
  $administratorMenu.show();
  $('.profile-manager').removeAttribute('hidden');
  $('.login-manager').setAttribute('hidden', true);
  moveToPage('#!product-manage');
};

export const renderUserView = () => {
  $administratorMenu.hide();
  $('.login-manager').removeAttribute('hidden');
  $('.profile-manager').setAttribute('hidden', true);
  moveToPage('#!product-purchase');
};

const renderInitContainer = () => {
  if (JSON.parse(localStorage.getItem('userAuth'))) {
    renderManagerView();
    return;
  }
  renderUserView();
};

window.addEventListener('hashchange', () => {
  const currentHash = window.location.hash;
  renderTargetContainer(currentHash);
});

renderInitContainer();
