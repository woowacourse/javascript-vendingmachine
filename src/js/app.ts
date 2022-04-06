import ProductModerator from "./moderator/productModerator";
import ChangesModerator from "./moderator/changesModerator";
import PurchaseModerator from "./moderator/purchaseModerator";
import SignUpModerator from "./moderator/signUpModerator";
import LoginModerator from "./moderator/loginModerator";

class App {
  productModerator;
  changesModerator;
  purchaseModerator;
  signUpModerator;
  loginModerator;

  constructor() {
    this.productModerator = new ProductModerator();
    this.changesModerator = new ChangesModerator();
    this.purchaseModerator = new PurchaseModerator();
    this.signUpModerator = new SignUpModerator();
    this.loginModerator = new LoginModerator();

    window.addEventListener("hashchange", this.onChangePage);
    this.onChangePage();
  }

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
  };
}

new App();
