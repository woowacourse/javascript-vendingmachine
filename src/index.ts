import './css/index';
import router from './js/routes';

const routes = new router();
routes.init();

const productManageButton = document.querySelector('#product-manage-button');
const changeAddButton = document.querySelector('#change-add-button');
// const btn3 = document.querySelector('#product-purchase-button');

productManageButton.addEventListener('click', () => {
  routes.go('#!/product-manage');
});

changeAddButton.addEventListener('click', () => {
  routes.go('#!/change-add');
});

window.addEventListener('popstate', function () {
  routes.back();
});
