import Charge from "./charge/Charge";
import MenuTab from "./menuTab/MenuTab";
import Product from "./product/Product";
import Purchase from "./purchase/Purchase";
import { selectDom, selectDomAll } from "../utils/dom";
import { menuTabTemplate } from "./menuTab/menuTabTemplate";

class Vendingmachine {
  menuTab: MenuTab;
  product: Product;
  charge: Charge;
  purchase: Purchase;

  constructor() {
    const vendingmachineWrap = selectDom("#app");
    vendingmachineWrap.insertAdjacentHTML(
      "beforeend",
      `<aside id="snackbar-wrap"></aside> <h1>🍿 자판기 🍿</h1> ${menuTabTemplate} <main class="main"></main>`
    );

    this.mountComponent();
    this.convertTemplate(location.hash || "#product");
    this.handleMenuStyle();
  }

  mountComponent() {
    this.menuTab = new MenuTab(this.convertTemplate);
    this.product = new Product();
    this.charge = new Charge();
    this.purchase = new Purchase();

    if (!location.hash) {
      history.pushState({ path: "#product" }, null, "#product");
    }

    window.addEventListener("popstate", () => {
      this.convertTemplate(location.hash || "#product");
      this.handleMenuStyle();
    });
  }

  handleMenuStyle() {
    const navList = selectDomAll(".nav__button");
    navList.forEach((navButton: HTMLButtonElement) =>
      navButton.dataset.menu === location.hash
        ? navButton.classList.add("button-click")
        : navButton.classList.remove("button-click")
    );
  }

  convertTemplate = (path: string) => {
    const routes = {
      "#product": () => this.product.render(),
      "#charge": () => this.charge.render(),
      "#purchase": () => this.purchase.render(),
    };

    routes[path]();
  };
}


export default Vendingmachine;
