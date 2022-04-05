import Charge from "./charge/Charge";
import MenuTab from "./menuTab/MenuTab";
import Product from "./product/Product";
import Purchase from "./purchase/Purchase";
import { selectDom, selectDomAll } from "../utils/dom";
import { menuTabTemplate } from "./menuTab/menuTabTemplate";
import Login from "./login/login";
import Signup from "./signup/Signup";

class Vendingmachine {
  login: Login;
  menuTab: MenuTab;
  product: Product;
  charge: Charge;
  purchase: Purchase;
  signup: Signup;
  vendingmachineFunctionWrap: HTMLElement;

  constructor() {
    const vendingmachineWrap = selectDom("#app");
    vendingmachineWrap.insertAdjacentHTML(
      "beforeend",
      `<aside id="snackbar-wrap"></aside>
        <header class="header">
        </header>
        <main class="main"></main>`
    );

    this.mountComponent();
    this.convertTemplate(location.hash || "#product");
    this.handleMenuStyle();
  }

  mountComponent() {
    this.login = new Login(this.convertTemplate);
    this.signup = new Signup(this.convertTemplate);
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
      "#login": () => this.login.render(),
      "#signup": () => this.signup.render(),
      "#product": () => this.product.render(),
      "#charge": () => this.charge.render(),
      "#purchase": () => this.purchase.render()
    };

    this.menuTab.render(path); 
    routes[path]();
  };
}


export default Vendingmachine;
