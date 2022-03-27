import { $ } from './utils/dom';
import { BASE_URL } from './constants';

const $productManageButton = $('.nav__product-manage-button');
const $productManageContainer = $('product-manage-container');

const $coinChargeButton = $('.nav__coin-charge-button');
const $coinChargeContainer = $('coin-charge-container');

const renderProductManageContainer = () => {
  $productManageContainer.show();
  $coinChargeContainer.hide();

  $productManageButton.classList.add('clicked');
  $coinChargeButton.classList.remove('clicked');
};

const handleProductManageButtonClick = (event) => {
  const route = event.target.getAttribute('route');

  window.history.pushState({}, null, route);

  renderProductManageContainer();
};

const renderCoinChargeContainer = () => {
  $productManageContainer.hide();
  $coinChargeContainer.show();

  $productManageButton.classList.remove('clicked');
  $coinChargeButton.classList.add('clicked');
};

const handleCoinChargeButtonClick = (event) => {
  const route = event.target.getAttribute('route');

  window.history.pushState({}, null, route);

  renderCoinChargeContainer();
};

const renderTargetContainer = (path) => {
  if (path === `${BASE_URL}/`) {
    renderProductManageContainer();

    return;
  }

  renderCoinChargeContainer();
};

renderTargetContainer(window.location.pathname);

$productManageButton.addEventListener('click', handleProductManageButtonClick);
$coinChargeButton.addEventListener('click', handleCoinChargeButtonClick);

window.addEventListener('popstate', () => {
  renderTargetContainer(window.location.pathname);
});
