import { $ } from './utils/dom';

const $productManageButton = $('.nav__product-manage-button');
const $productManageContainer = $('product-manage-container');
const $productNameInput = $('.product-name-input');

const $coinChargeButton = $('.nav__coin-charge-button');
const $coinChargeContainer = $('coin-charge-container');
const $coinInput = $('#coin-input');

const menuContainers = [$productManageContainer, $coinChargeContainer];
const menuButtons = [$productManageButton, $coinChargeButton];

const renderFocusContainer = ($currentContainer, $currentButton, $currentInput) => {
  menuContainers.forEach((container) => {
    if (container === $currentContainer) {
      container.show();
      return;
    }
    container.hide();
  });

  menuButtons.forEach((button) => {
    if (button === $currentButton) {
      button.classList.add('clicked');
      return;
    }
    button.classList.remove('clicked');
  });

  $currentInput.focus();
};

const renderTargetContainer = (currentHash) => {
  if (currentHash === '#!product-manage') {
    renderFocusContainer($productManageContainer, $productManageButton, $productNameInput);
  }
  if (currentHash === '#!coin-charge') {
    renderFocusContainer($coinChargeContainer, $coinChargeButton, $coinInput);
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
