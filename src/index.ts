import './css/index';
import { PATH_NAME } from './js/constants';
import router from './js/routes';

const routes = new router();
routes.init();

const productManageButton = document.querySelector('#product-manage-button');
const changeAddButton = document.querySelector('#change-add-button');
const productPurchaseButton = document.querySelector('#product-purchase-button');
const loginPageButton = document.querySelector('#login-page-button');

productManageButton.addEventListener('click', () => {
  routes.go(PATH_NAME.PRODUCT_MANAGE);
});

changeAddButton.addEventListener('click', () => {
  routes.go(PATH_NAME.ADD_CHANGE);
});

productPurchaseButton.addEventListener('click', () => {
  routes.go(PATH_NAME.PRODUCT_PURCHASE);
});

loginPageButton.addEventListener('click', () => {
  routes.go(PATH_NAME.LOGIN);
});

window.addEventListener('popstate', function () {
  routes.back();
});
