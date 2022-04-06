import "./pages/product-manage.page";
import "./pages/changes-manage.page";
import "./pages/product-purchase.page";
import isLogin from "./util/checkLogin";

class App {
  constructor() {
    this.$nav = document.querySelector("#page-tab-container");
    this.$page = document.querySelector("#page");
    this.$nav.addEventListener("click", this.onClickNavButton);
    window.addEventListener("hashchange", this.onChangePage);

    this.onChangePage();
  }

  onClickNavButton = ({ target }) => {
    if (target.classList.contains("product-management-button")) {
      this.$page.innerHTML = "<product-manage></product-manage>";
    }

    if (target.classList.contains("changes-charge-button")) {
      this.$page.innerHTML = "<changes-manage></changes-manage>";
    }

    if (target.classList.contains("product-purchase-button")) {
      this.$page.innerHTML = "<product-purchase></product-purchase>";
    }
  };

  onChangePage = () => {
    const hash = location.hash;

    if (hash === "#!productManagement") {
      this.$page.innerHTML = "<product-manage></product-manage>";
    }

    if (hash === "#!changesCharge") {
      this.$page.innerHTML = "<changes-manage></changes-manage>";
    }

    if (hash === "#!productPurchase") {
      this.$page.innerHTML = "<product-purchase></product-purchase>";
    }
  };
}

if (isLogin()) {
  new App();
}
