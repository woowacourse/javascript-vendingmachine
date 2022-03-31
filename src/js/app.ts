import ProductModerator from "./moderator/productModerator";
import ChangesModerator from "./moderator/changesModerator";
import { $ } from "./util/dom";

class App {
  productModerator;
  changesModerator;
  $nav;

  constructor() {
    this.productModerator = new ProductModerator();
    this.changesModerator = new ChangesModerator();

    this.$nav = $("#page-tab-container");
    this.$nav.addEventListener("click", this.onClickNavButton);
    window.addEventListener("hashchange", this.onChangePage);

    this.onChangePage();
  }

  onClickNavButton = (e: Event): void => {
    const target = e.target as HTMLElement;
    if (target.classList.contains("product-management-button")) {
      this.productModerator.init();
    }

    if (target.classList.contains("changes-charge-button")) {
      this.changesModerator.init();
    }
  };

  onChangePage = (): void => {
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
