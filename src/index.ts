import './css/index';
import routes from './js/routes';

routes();

const nav = document.querySelector('nav');

const productManageButton = document.querySelector('#product-manage-button');
const changeAddButton = document.querySelector('#change-add-button');
const btn3 = document.querySelector('#product-purchase-button');

productManageButton.addEventListener('click', () => {
  console.log('click1');
  history.pushState({}, '상품 관리하기', window.location.pathname + '#!/product-manage');
  routes();
});

changeAddButton.addEventListener('click', () => {
  console.log('click2');
  history.pushState({}, '잔돈 채우기', window.location.pathname + '#!/change-add');
  routes();
});

window.addEventListener('popstate', function () {
  console.log('popstate', history.state);
});
