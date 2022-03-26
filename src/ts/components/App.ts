import { $, $$ } from "../utils/dom";
import Charge from "./charge/Charge";
import MenuTab from "./menuTab/MenuTab";
import { menuTabTemplate } from "./menuTab/menuTabTemplate";
import Product from "./product/Product";

class App {
  app: HTMLElement;
  menuTab: MenuTab;
  charge: Charge;
  product: Product;

  constructor() {
    this.app = $("#app");
    this.app.insertAdjacentHTML("beforeend", `<h1>🍿 자판기 🍿</h1> ${menuTabTemplate} <main class="main"></main>`);

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
    const navList = $$(".nav__button");
    navList.forEach((button: HTMLButtonElement) =>
      button.dataset.menu === location.hash
        ? button.classList.add("button-click")
        : button.classList.remove("button-click"),
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

export default App;
