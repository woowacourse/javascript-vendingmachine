import { $ } from "../utils/dom";
import Charge from "./charge/Charge";
import MenuTab from "./menuTab/MenuTab";
import Product from "./product/Product";

class App {
  app: HTMLElement;
  menuTab: MenuTab;
  charge: Charge;
  product: Product;

  constructor() {
    this.app = $("#app");
    this.app.insertAdjacentHTML(
      "beforeend",
      `<nav class="nav"> 
        <button type="button" class="button nav__button button-click" data-menu="/product">
          상품 관리
        </button> 
        <button type="button" class="button nav__button" data-menu="/charge">
          잔돈 충전
        </button> 
        <button type="button" class="button nav__button" data-menu="">
          상품 구매
        </button> 
       </nav>
       <main class="main"></main>`
    );

    this.mountComponent();
  }

  mountComponent() {
    this.menuTab = new MenuTab({ convertTemplate: this.convertTemplate });
    this.charge = new Charge();
    this.product = new Product();
  }

  convertTemplate = (path: string) => {
    const routes = {
      "/charge": () => this.charge.render(),
      "/product": () => this.product.render(),
    };

    routes[path]();
  };
}

export default App;
