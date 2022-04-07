import { $, $$ } from "../utils/dom";
import ProductManager from "../manager/ProductManager";
import ChargeManager from "../manager/ChargeManager";

import MenuTabComponent from "./menuTab/MenuTabComponent";
import ProductComponent from "./product/ProductComponent";
import ChargeComponent from "./charge/ChargeComponent";
import PurchaseComponent from "./purchase/PurchaseComponent";
import LoginComponent from "./login/loginComponent";
import SignupComponent from "./signup/SignupComponent";
import { getSessionStorage, removeSessionStorage } from "../utils/sessionStorage";
import ProfileComponent from "./profile/ProfileComponent";
import { KEY } from "../utils/constants";

export type Path = "#product" | "#charge" | "#purchase" | "#login" | "#profile" | "#signup";
export type ConvertTemplate = (path: Path) => void;
export type HideHeader = () => void;

class App {
  app: HTMLElement;
  manageContainers: NodeList;
  productManager: ProductManager;
  chargeManager: ChargeManager;
  menuTabComponent: MenuTabComponent;
  productComponent: ProductComponent;
  chargeComponent: ChargeComponent;
  purchaseComponent: PurchaseComponent;
  loginComponent: LoginComponent;
  signupComponent: SignupComponent;
  profileComponent: ProfileComponent;
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
         <section class="product-manage__container manage__container"></section>
         <section class="charge-manage__container manage__container"></section>
         <section class="purchase-manage__container manage__container"></section>
         <section class="login-manage__container manage__container"></section>
         <section class="signup-manage__container manage__container"></section>
         <section class="profile-manage__container manage__container"></section>
       </main>`,
    );

    this.manageContainers = $$(".manage__container");
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
    this.profileComponent = new ProfileComponent(this.hideHeader, this.convertTemplate);

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
    this.selectBox.classList.add("hide");
  }

  handleLogout() {
    removeSessionStorage(KEY.ACCESS_TOKEN);
    removeSessionStorage(KEY.USER_INFO);
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

  showMenuTab() {
    this.menuTabComponent.show();
    this.menuTabComponent.changeTabStyle();
  }

  hideHeader = () => {
    this.hideMenuTab();
    this.hideAppTitle();
    this.hideLoginButton();
    this.hideThumnailButton();
  };

  hideMenuTab() {
    this.menuNav.classList.add("hide");
  }

  hideAppTitle() {
    this.appTitle.classList.add("hide");
  }

  hideLoginButton() {
    this.loginButton.classList.add("hide");
  }

  hideThumnailButton() {
    this.thumnailButton.classList.add("hide");
  }

  showAppTitle() {
    this.appTitle.classList.remove("hide");
  }

  showLoginButton() {
    this.loginButton.classList.remove("hide");
  }

  showThumnailButton() {
    this.thumnailButton.textContent = getSessionStorage(KEY.USER_INFO).name.slice(0, 1);
    this.thumnailButton.classList.remove("hide");
  }

  checkLoggedIn() {
    const loggedIn = getSessionStorage(KEY.ACCESS_TOKEN);

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
      "#profile": () => this.profileComponent.show(),
    };

    routes[path]();
  };
}

export default App;
