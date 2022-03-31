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
  manageContainers: NodeList;

  constructor() {
    this.app = $("#app");
    this.app.insertAdjacentHTML(
      "beforeend",
      `<h1>🍿 자판기 🍿</h1>
      ${menuTabTemplate}
      <main>
        <section class="product-manange__container container"></section>
        <section class="charge-manange__container container"></section>
      </main>`,
    );
    this.manageContainers = $$(".container");

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

  hideContainers() {
    this.manageContainers.forEach((element: HTMLElement) => element.classList.add("hide"));
  }

  convertTemplate = (path: string) => {
    this.hideContainers();

    const routes = {
      "#charge": () => this.charge.show(),
      "#product": () => this.product.show(),
      "#purchase": () => "",
    };

    routes[path]();
  };
}

export default App;
