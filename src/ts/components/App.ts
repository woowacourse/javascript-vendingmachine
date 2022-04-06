import { $, $$ } from "../utils/dom";
import { menuTabTemplate } from "./menuTab/menuTabTemplate";

import ChargeManager from "../mananger/ChargeManager";
import ProductManager from "../mananger/ProductManager";

import MenuTabComponent from "./menuTab/MenuTabComponent";
import ProductComponent from "./product/ProductComponent";
import ChargeComponent from "./charge/ChargeComponent";
import PurchaseComponent from "./purchase/PurchaseComponent";

export type Path = "#product" | "#charge" | "purchase";

class App {
  app: HTMLElement;
  manageContainers: NodeList;
  menuTabComponent: MenuTabComponent;
  productComponent: ProductComponent;
  chargeComponent: ChargeComponent;
  purchaseComponent: PurchaseComponent;
  productManager: ProductManager;
  chargeManager: ChargeManager;

  constructor() {
    this.app = $("#app");
    this.app.insertAdjacentHTML(
      "beforeend",
      `<h1>🍿 자판기 🍿</h1>
      ${menuTabTemplate}
      <main>
        <section class="product-manange__container manange-container"></section>
        <section class="charge-manange__container manange-container"></section>
        <section class="purchase-manange__container manange-container"></section>
      </main>`,
    );
    this.manageContainers = $$(".manange-container");

    this.productManager = new ProductManager();
    this.chargeManager = new ChargeManager();
    this.menuTabComponent = new MenuTabComponent(this.convertTemplate);
    this.productComponent = new ProductComponent(this.productManager);
    this.chargeComponent = new ChargeComponent(this.chargeManager);
    this.purchaseComponent = new PurchaseComponent(this.productManager, this.chargeManager);

    if (!location.hash) {
      history.pushState({ path: "#product" }, null, "#product");
      this.convertTemplate("#product");
    }

    this.convertTemplate((location.hash as Path) || "#product");
  }

  hideContainers() {
    this.manageContainers.forEach((element: HTMLElement) => element.classList.add("hide"));
  }

  convertTemplate = (path: Path): void => {
    this.hideContainers();

    const routes = {
      "#product": () => this.productComponent.show(),
      "#charge": () => this.chargeComponent.show(),
      "#purchase": () => this.purchaseComponent.show(),
    };

    routes[path]();
  };
}

export default App;
