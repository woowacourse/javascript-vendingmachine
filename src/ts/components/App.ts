import ChargeManager from "../mananger/ChargeManager";
import ProductManager from "../mananger/ProductManager";
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
      </main>`,
    );
    this.manageContainers = $$(".manange-container");

    this.productManager = new ProductManager();
    this.chargeManager = new ChargeManager();
    this.menuTab = new MenuTab({ convertTemplate: this.convertTemplate });
    this.product = new Product({ productManager: this.productManager });
    this.charge = new Charge({ chargeManager: this.chargeManager });

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
