import { $, $$ } from './utils/dom';
// import { BASE_URL } from './constants';

const $nav = $('nav');
const $navButtons = $$('button', $nav);

const $productManageButton = $('.nav__product-manage-button');
const $productManageContainer = $('product-manage-container');
const $productNameInput = $('.product-name-input');

const $coinChargeButton = $('.nav__coin-charge-button');
const $coinChargeContainer = $('coin-charge-container');
const $coinInput = $('#coin-input');

const handleNavButtonClick = (clickedButtonClassList) => {
  clickedButtonClassList.add('clicked');
  $navButtons.forEach((nav) => {
    if (nav.classList === clickedButtonClassList) return;
    nav.classList.remove('clicked');
  });
};

$nav.addEventListener('click', (event) => {
  if (event.target.tagName === 'BUTTON') {
    handleNavButtonClick(event.target.classList);
  }
});

const renderProductManageContainer = () => {
  $productManageContainer.show();
  $coinChargeContainer.hide();

  $productManageButton.classList.add('clicked');
  $coinChargeButton.classList.remove('clicked');

  $productNameInput.focus();
};

const renderCoinChargeContainer = () => {
  $productManageContainer.hide();
  $coinChargeContainer.show();

  $productManageButton.classList.remove('clicked');
  $coinChargeButton.classList.add('clicked');

  $coinInput.focus();
};

const renderTargetContainer = (currentHash) => {
  if (currentHash === '#!product-manage') {
    renderProductManageContainer();
  }
  if (currentHash === '#!coin-charge') {
    renderCoinChargeContainer();
  }
};

const renderInitContainer = (currentHash) => {
  renderTargetContainer(currentHash);
};

window.addEventListener('hashchange', () => {
  const currentHash = window.location.hash;
  renderTargetContainer(currentHash);
});

renderInitContainer(window.location.hash);
