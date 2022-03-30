import { PATH_NAME } from './constants';
import AddChange from './pages/AddChange';
import ProductManage from './pages/ProductManage';

class router {
  prevPath: string;
  productManage: ProductManage;
  addChange: AddChange;

  constructor() {
    this.productManage = new ProductManage();
    this.addChange = new AddChange();
    this.prevPath = null;
  }

  init() {
    this.go(window.location.hash);
  }

  back() {
    this.go(window.location.hash);
  }

  go(hash: string) {
    if (this.prevPath === hash) {
      return;
    }

    this.prevPath = hash;
    this.clear();

    switch (hash) {
      case PATH_NAME.PRODUCT_MANAGE:
        history.pushState({}, '상품 관리하기', window.location.pathname + hash);
        this.productManage.render();
        break;
      case PATH_NAME.ADD_CHANGE:
        history.pushState({}, '잔돈 충전하기', window.location.pathname + hash);
        this.addChange.render();
        break;
      default:
        break;
    }
  }

  private clear() {
    const $inputSection = document.querySelector('.input-section');
    const $contentsContainer = document.querySelector('.contents-container');

    $inputSection.replaceChildren();
    $contentsContainer.replaceChildren();
  }
}

export default router;
