import { $ } from './utils/dom';
import AuthStateStoreInstance from './domains/stores/AuthStateStore';
import showSnackbar from './utils/showSnackbar';

const $administratorMenu = document.querySelector('administrator-menu');
const $userManagerContainer = document.querySelector('#user-manager-container');
const $userMenuContainer = document.querySelector('#user-menu-container');
const $nav = document.querySelector('nav');
const $productManageContainer = $('product-manage-container');
const $coinChargeContainer = $('coin-charge-container');
const $productPurchaseContainer = $('product-purchase-container');
const $infoModifyContainer = $('info-modify-container');
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
  { hash: '#!info-modify', target: $infoModifyContainer, isLongApp: false },
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
  if (currentHash === '#!signup' || currentHash === '#!login' || currentHash === '#!info-modify') {
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

const renderUpdatedUserInfo = (response) => {
  $('.profile-button').textContent = response.name.substring(0, 1);
  $('#info-email-input').setAttribute('placeholder', response.email);
  $('#info-name-input').setAttribute('placeholder', response.name);
};

export const updateUserInfo = () => {
  const userAuth = JSON.parse(localStorage.getItem('userAuth'));

  const { id } = userAuth;
  const accessToken = `Bearer ${userAuth.accessToken}`;

  const url = `https://woowa-vendingmachine-app.herokuapp.com/600/users/${id}`;

  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: accessToken,
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw Error('잘못된 접근입니다. 로그인이 되어있는지 확인하세요.');
      }
      return res.json();
    })
    .then((response) => renderUpdatedUserInfo(response))
    .catch((error) => showSnackbar(error));
};

export const renderManagerView = () => {
  const currentHash = window.location.hash;

  $administratorMenu.show();
  updateUserInfo();
  window.onload = () => {
    $('.login-manager').classList.add('hidden');
    $('.profile-manager').classList.remove('hidden');
    $('.profile-manager-menu').classList.add('hidden');
  };
  if (currentHash === '#!product-manage') {
    renderTargetContainer(currentHash);
    return;
  }
  moveToPage('#!product-manage');
};

export const renderUserView = () => {
  const currentHash = window.location.hash;

  $administratorMenu.hide();
  window.addEventListener('DOMContentLoaded', () => {
    $('.login-manager').classList.remove('hidden');
    $('.profile-manager').classList.add('hidden');
  });
  if (currentHash === '#!product-purchase') {
    renderTargetContainer(currentHash);
    return;
  }
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
  const { isLogined } = AuthStateStoreInstance;

  if (!isLogined && currentHash !== '#!login' && currentHash !== '#!product-purchase' && currentHash !== '#!signup')
    return;

  renderTargetContainer(currentHash);
});

renderInitContainer();
