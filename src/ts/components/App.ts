import { $, $$ } from "../utils/dom";
import { menuTabTemplate } from "./menuTab/menuTabTemplate";

import ChargeManager from "../mananger/ChargeManager";
import ProductManager from "../mananger/ProductManager";

import MenuTabComponent from "./menuTab/MenuTabComponent";
import ProductComponent from "./product/ProductComponent";
import ChargeComponent from "./charge/ChargeComponent";
import PurchaseComponent from "./purchase/PurchaseComponent";

export interface ConvertTemplate {
  (path: string): void;
}

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
    this.menuTabComponent = new MenuTabComponent({ convertTemplate: this.convertTemplate });
    this.productComponent = new ProductComponent({ productManager: this.productManager });
    this.chargeComponent = new ChargeComponent({ chargeManager: this.chargeManager });
    this.purchaseComponent = new PurchaseComponent();

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
      "#charge": () => this.chargeComponent.show(),
      "#product": () => this.productComponent.show(),
      "#purchase": () => this.purchaseComponent.show(),
    };

    routes[path]();
  };
}

export default App;
