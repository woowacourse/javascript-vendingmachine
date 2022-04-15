import ProductModerator from "./moderator/productModerator";
import ChangesModerator from "./moderator/changesModerator";
import PurchaseModerator from "./moderator/purchaseModerator";
import SignUpModerator from "./moderator/signUpModerator";
import LoginModerator from "./moderator/loginModerator";
import Authorization from "./domain/authorization";
import UserInfoModerator from "./moderator/userInfoModerator";
import { HASH } from "./constant";
import { $ } from "./util/dom";

class App {
  productModerator;
  changesModerator;
  purchaseModerator;
  signUpModerator;
  loginModerator;
  userInfoModerator;
  authorization;
  router;

  constructor() {
    this.productModerator = new ProductModerator();
    this.changesModerator = new ChangesModerator();
    this.purchaseModerator = new PurchaseModerator();
    this.signUpModerator = new SignUpModerator();
    this.loginModerator = new LoginModerator();
    this.userInfoModerator = new UserInfoModerator();
    this.authorization = new Authorization();
    window.addEventListener("hashchange", this.onChangePage);
    $("#header").addEventListener("click", this.onClickHeader);
    this.router = {
      [HASH.PRODUCT_MANAGEMENT]: () => {
        this.productModerator.init();
      },
      [HASH.CHARGE_CHANGES]: () => {
        this.changesModerator.init();
      },
      [HASH.PRODUCT_PURCHASE]: () => {
        this.purchaseModerator.init();
      },
      [HASH.SIGNUP]: () => {
        this.signUpModerator.init();
      },
      [HASH.LOGIN]: () => {
        this.loginModerator.init();
      },
      [HASH.USER_INFO]: () => {
        this.userInfoModerator.init();
      },
    };
    this.onChangePage();
  }

  onClickHeader = (e: Event) => {
    const target = e.target as HTMLElement;
    if (target.id !== "logout") return;
    this.authorization.logout();
  };

  onChangePage = (): void => {
    const hash = location.hash;
    this.router[hash]
      ? this.router[hash]()
      : this.router[HASH.PRODUCT_PURCHASE]();
  };
}

new App();
