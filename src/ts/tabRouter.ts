import { $, $$ } from './utils';
import { URL, ID } from './constants';

const $$tabResultContainers = $$('.tab-result-container');
const $tabProductManageButton = $('#tab-product-manage');
const $tabRechargeButton = $('#tab-recharge');
const $tabPurchaseProductButton = $('#tab-purchase-product');
const $$tabButtons = $$('.tab-button');

$tabProductManageButton.addEventListener('click', () => tabRouter(URL.PRODUCT_MANAGE));
$tabRechargeButton.addEventListener('click', () => tabRouter(URL.RECHARGE));
$tabPurchaseProductButton.addEventListener('click', () => tabRouter(URL.PURCHASE_PRODUCT));

const renderTabResult = (id) => {
  $$tabResultContainers.forEach((container, index) => {
    if (container.id === id) {
      container.classList.remove('hide');
      $$tabButtons[index].checked = true;
      return;
    }
    container.classList.add('hide');
  });
};

const tabRouter = (url, isPopState = false) => {
  if (!isPopState) history.pushState({ url }, null, url);
  const routes = {
    '/#!/product-manage': () => {
      renderTabResult(ID.PRODUCT_MANAGE);
    },
    '/#!/recharge': () => {
      renderTabResult(ID.RECHARGE);
    },
    '/#!/purchase-product': () => {
      renderTabResult(ID.PURCHASE_PRODUCT);
    },
  };
  routes[url]();
};

window.addEventListener('popstate', (event) => {
  tabRouter(event.state.url, true);
});

history.replaceState({ url: URL.PRODUCT_MANAGE }, null, URL.PRODUCT_MANAGE);
renderTabResult(ID.PRODUCT_MANAGE);
