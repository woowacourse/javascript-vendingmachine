import MainContentsComponent from './components/MainContentsComponent';
import ProductPurchase from './pages/ProductPurchase';
import ProductManage from './pages/ProductManage';
import AddChange from './pages/AddChange';
import Login from './pages/Login';
import { PATH_NAME } from './constants';
import Register from './pages/Register';
import Auth from './utils/Auth';

class router {
  prevPath: string;
  mainContentsComponent: MainContentsComponent;
  productManage: ProductManage;
  addChange: AddChange;
  productPurchase: ProductPurchase;
  login: Login;
  register: Register;

  constructor() {
    this.login = new Login();
    this.register = new Register();
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

    this.mainContentsComponent = new MainContentsComponent();
    this.mainContentsComponent.render();

    this.productManage = new ProductManage();
    this.addChange = new AddChange();
    this.productPurchase = new ProductPurchase();

    this.prevPath = hash;
    this.clear();

    switch (hash) {
      case PATH_NAME.PRODUCT_MANAGE:
        Auth();
        history.pushState({}, '상품 관리하기', window.location.pathname + hash);
        this.productManage.render();
        break;
      case PATH_NAME.ADD_CHANGE:
        history.pushState({}, '잔돈 충전하기', window.location.pathname + hash);
        this.addChange.render();
        break;
      case PATH_NAME.PRODUCT_PURCHASE:
        history.pushState({}, '상품 구매하기', window.location.pathname + hash);
        this.productPurchase.render();
        break;
      case PATH_NAME.LOGIN:
        history.pushState({}, '로그인', window.location.pathname + hash);
        this.login.render();
        break;
      case PATH_NAME.REGISTER:
        history.pushState({}, '회원가입', window.location.pathname + hash);
        this.register.render();
        break;
      default:
        break;
    }
  }

  private clear() {
    const $inputSection = document.querySelector('.input-section');
    const $contentsContainer = document.querySelector('.contents-container');
    const $loginInputContainer = document.querySelector('#login-input-container');

    if ($inputSection) {
      $inputSection.replaceChildren();
      $contentsContainer.replaceChildren();
    }

    if ($loginInputContainer) {
      $loginInputContainer.replaceChildren();
    }
  }
}

const routes = new router();

export default routes;
