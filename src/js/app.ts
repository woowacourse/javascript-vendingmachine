import ProductModerator from "./moderator/productModerator";
import ChangesModerator from "./moderator/changesModerator";
import PurchaseModerator from "./moderator/purchaseModerator";
import SignUpModerator from "./moderator/signUpModerator";
import LoginModerator from "./moderator/loginModerator";
import Authorization from "./domain/authorization";
import UserInfoModerator from "./moderator/userInfoModerator";

import { $ } from "./util/dom";

class App {
  productModerator;
  changesModerator;
  purchaseModerator;
  signUpModerator;
  loginModerator;
  userInfoModerator;
  authorization;

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
    this.onChangePage();
  }

  onClickHeader = (e: Event) => {
    const target = e.target as HTMLElement;
    if (target.id !== "logout") return;
    this.authorization.logout();
  };

  onChangePage = (): void => {
    const hash = location.hash;

    if (hash === "#!productManagement") {
      this.productModerator.init();
    }

    if (hash === "#!changesCharge") {
      this.changesModerator.init();
    }

    if (hash === "#!purchaseProduct" || hash === "") {
      this.purchaseModerator.init();
    }

    if (hash === "#!signUp") {
      this.signUpModerator.init();
    }

    if (hash === "#!login") {
      this.loginModerator.init();
    }

    if (hash === "#!userInfo") {
      this.userInfoModerator.init();
    }
  };
}

new App();
