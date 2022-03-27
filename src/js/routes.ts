import ChangeAdd from './pages/ChangeAdd';
import ProductManage from './pages/ProductManage';

class router {
  prevPath: string;
  productManage: ProductManage;
  changeAdd: ChangeAdd;

  constructor() {
    this.productManage = new ProductManage();
    this.changeAdd = new ChangeAdd();
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
      case '#!/product-manage':
        history.pushState({}, '상품 관리하기', window.location.pathname + hash);
        this.productManage.render();
        break;
      case '#!/change-add':
        history.pushState({}, '잔돈 충전하기', window.location.pathname + hash);
        this.changeAdd.render();
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
