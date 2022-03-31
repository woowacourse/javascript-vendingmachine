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
        <section class="product-manange__container manange-container"></section>
        <section class="charge-manange__container manange-container"></section>
      </main>`,
    );
    this.manageContainers = $$(".manange-container");

    this.menuTab = new MenuTab({ convertTemplate: this.convertTemplate });
    this.charge = new Charge();
    this.product = new Product();

    if (!location.hash) {
      history.pushState({ path: "#product" }, null, "#product");
    }
    this.convertTemplate(location.hash || "#product");
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
