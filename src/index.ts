import './css/index';
import routes from './js/routes';

routes();

const productManageButton = document.querySelector('#product-manage-button');
const changeAddButton = document.querySelector('#change-add-button');
const productPurchaseButton = document.querySelector('#product-purchase-button');

productManageButton.addEventListener('click', () => {
  const { hash, pathname } = window.location;
  const path: string = '#!/product-manage';

  if (hash === path) return;

  history.pushState({}, '상품 관리하기', pathname + '#!/product-manage');
  routes();
});

changeAddButton.addEventListener('click', () => {
  const { hash, pathname } = window.location;
  const path: string = '#!/change-add';

  if (hash === path) return;

  history.pushState({}, '잔돈 채우기', pathname + '#!/change-add');
  routes();
});

productPurchaseButton.addEventListener('click', () => {
  const { hash, pathname } = window.location;
  const path: string = '#!/product-purchase';

  if (hash === path) return;

  history.pushState({}, '상품 구매', pathname + '#!/product-purchase');
  routes();
});

window.addEventListener('popstate', function () {
  routes();
});
