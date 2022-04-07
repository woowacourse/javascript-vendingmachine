import { $, $$ } from "../utils/dom";

import ChargeManager from "../mananger/ChargeManager";
import ProductManager from "../mananger/ProductManager";

import MenuTabComponent from "./menuTab/MenuTabComponent";
import ProductComponent from "./product/ProductComponent";
import ChargeComponent from "./charge/ChargeComponent";
import PurchaseComponent from "./purchase/PurchaseComponent";
import LoginComponent from "./login/loginComponent";
import SignupComponent from "./signup/SignupComponent";
import { getSessionStorage, removeSessionStorage } from "../utils/sessionStorage";

export type Path = "#product" | "#charge" | "#purchase" | "#login" | "#profile" | "#signup";
export type ConvertTemplate = (path: Path) => void;
export type HideHeader = () => void;

class App {
  app: HTMLElement;
  manageContainers: NodeList;
  menuTabComponent: MenuTabComponent;
  productComponent: ProductComponent;
  chargeComponent: ChargeComponent;
  purchaseComponent: PurchaseComponent;
  productManager: ProductManager;
  loginComponent: LoginComponent;
  signupComponent: SignupComponent;
  chargeManager: ChargeManager;
  menuNav: HTMLElement;
  loginButton: HTMLButtonElement;
  thumnailButton: HTMLButtonElement;
  selectBox: HTMLDivElement;
  appTitle: HTMLHeadingElement;

  constructor() {
    this.app = $("#app");
    this.app.insertAdjacentHTML(
      "beforeend",
      `<div class="header-container">
        <button type="button" class="header__login-button button">로그인</button>
        <button type="button" class="header__thumnail-button button hide"></button>
       </div>
       <div class="select-box hide">
         <button type="button" class="select-box__button button" data-menu="#profile">회원 정보 수정</button>
         <button type="button" class="select-box__button button" data-menu="#logout">로그아웃</button>
       </div>
       <h1 class="app-title">🍿 자판기 🍿</h1>
       <nav class="menu-nav"></nav>
       <main>
         <section class="product-manange__container manange-container"></section>
         <section class="charge-manange__container manange-container"></section>
         <section class="purchase-manange__container manange-container"></section>
         <section class="login-manange__container manange-container"></section>
         <section class="signup-manange__container manange-container"></section>
       </main>`,
    );

    this.manageContainers = $$(".manange-container");
    this.menuNav = $(".menu-nav");
    this.appTitle = $(".app-title");
    this.selectBox = $(".select-box");
    this.loginButton = $(".header__login-button");
    this.thumnailButton = $(".header__thumnail-button");

    this.productManager = new ProductManager();
    this.chargeManager = new ChargeManager();
    this.menuTabComponent = new MenuTabComponent(this.convertTemplate);
    this.productComponent = new ProductComponent(this.productManager);
    this.chargeComponent = new ChargeComponent(this.chargeManager);
    this.purchaseComponent = new PurchaseComponent(this.productManager, this.chargeManager);
    this.loginComponent = new LoginComponent(this.hideHeader, this.convertTemplate);
    this.signupComponent = new SignupComponent(this.hideHeader, this.convertTemplate);

    if (!location.hash) {
      history.pushState({ path: "#purchase" }, null, "#purchase");
    }

    this.convertTemplate((location.hash as Path) || "#purchase");

    this.thumnailButton.addEventListener("click", this.handleThumbnail);
    this.selectBox.addEventListener("click", this.handleSelectBoxOption);
    this.loginButton.addEventListener("click", this.handleLogin);
  }

  handleThumbnail = () => {
    this.selectBox.classList.toggle("hide");
  };

  handleSelectBoxOption = ({ target }) => {
    if (!target.classList.contains("select-box__button")) {
      return;
    }

    if (target.dataset.menu === "#profile") {
      this.moveProfilePage();
    }

    if (target.dataset.menu === "#logout") {
      this.handleLogout();
    }
  };

  moveProfilePage() {
    history.pushState({ path: "#profile" }, null, "#profile");
    this.convertTemplate("#profile");
    this.hideMenuTab();
    this.hideAppTitle();
    this.selectBox.classList.add("hide");
  }

  handleLogout() {
    removeSessionStorage("accessToken");
    removeSessionStorage("userInfo");
    this.convertTemplate("#purchase");
    this.handleThumbnail();
  }

  handleLogin = () => {
    history.pushState({ path: "#login" }, null, "#login");
    this.convertTemplate("#login");
  };

  hideComponents() {
    this.manageContainers.forEach((element: HTMLElement) => element.classList.add("hide"));
  }

  hideMenuTab() {
    this.menuNav.classList.add("hide");
  }

  showMenuTab() {
    this.menuTabComponent.show();
  }

  hideHeader = () => {
    this.hideAppTitle();
    this.hideLoginButton();
    this.hideMenuTab();
  };

  hideAppTitle() {
    this.appTitle.classList.add("hide");
  }

  showAppTitle() {
    this.appTitle.classList.remove("hide");
  }

  hideLoginButton() {
    this.loginButton.classList.add("hide");
  }

  showLoginButton() {
    this.loginButton.classList.remove("hide");
  }

  showThumnailButton() {
    this.thumnailButton.textContent = getSessionStorage("userInfo").name.slice(0, 1);
    this.thumnailButton.classList.remove("hide");
  }

  hideThumnailButton() {
    this.thumnailButton.classList.add("hide");
  }

  checkLoggedIn() {
    const loggedIn = getSessionStorage("accessToken");

    if (loggedIn) {
      this.hideLoginButton();
      this.showThumnailButton();
      this.showMenuTab();
    }
    if (!loggedIn) {
      this.showLoginButton();
      this.hideThumnailButton();
      this.hideMenuTab();
    }
  }

  convertTemplate = (path: Path): void => {
    this.hideComponents();
    this.showAppTitle();
    this.checkLoggedIn();

    const routes = {
      "#product": () => this.productComponent.show(),
      "#charge": () => this.chargeComponent.show(),
      "#purchase": () => this.purchaseComponent.show(),
      "#login": () => this.loginComponent.show(),
      "#signup": () => this.signupComponent.show(),
    };

    routes[path]();
  };
}

export default App;
