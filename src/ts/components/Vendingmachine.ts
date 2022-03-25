import { selectDom, selectDomAll } from "../utils/dom";
import Charge from "./charge/Charge";
import MenuTab from "./menuTab/MenuTab";
import { menuTabTemplate } from "./menuTab/menuTabTemplate";
import Product from "./product/Product";

class Vendingmachine {
  vendingmachineWrap: HTMLElement;
  menuTab: MenuTab;
  charge: Charge;
  product: Product;

  constructor() {
    this.vendingmachineWrap = selectDom("#app");
    this.vendingmachineWrap.insertAdjacentHTML(
      "beforeend",
      `<h1>🍿 자판기 🍿</h1> ${menuTabTemplate} <main class="main"></main>`
    );

    this.mountComponent();
    this.convertTemplate(location.hash || "#product");
    this.handleMenuStyle();
  }

  mountComponent() {
    this.menuTab = new MenuTab({ convertTemplate: this.convertTemplate });
    this.charge = new Charge();
    this.product = new Product();

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
      "#charge": () => this.charge.render(),
      "#product": () => this.product.render(),
      "#purchase": () => "",
    };

    routes[path]();
  };
}

export default Vendingmachine;
