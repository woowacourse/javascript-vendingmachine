import ProductModerator from "./moderator/productModerator";
import ChangesModerator from "./moderator/changesModerator";
import { $ } from "./util/dom";

class App {
  constructor() {
    this.productModerator = new ProductModerator();
    this.changesModerator = new ChangesModerator();

    this.$nav = $("#page-tab-container");
    this.$nav.addEventListener("click", this.onClickNavButton);
    window.addEventListener("hashchange", this.onChangePage);

    this.onChangePage();
  }

  onClickNavButton = ({ target }) => {
    if (target.classList.contains("product-management-button")) {
      this.changesModerator.unmount();
      this.productModerator.init();
    }

    if (target.classList.contains("changes-charge-button")) {
      this.productModerator.unmount();
      this.changesModerator.init();
    }
  };

  onChangePage = () => {
    const hash = location.hash;

    if (hash === "#!productManagement") {
      this.productModerator.init();
    }

    if (hash === "#!changesCharge") {
      this.changesModerator.init();
    }
  };
}

new App();
