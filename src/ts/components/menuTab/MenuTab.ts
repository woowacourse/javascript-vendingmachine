import { selectDom, selectDomAll, addEvent,  } from "../../utils/dom";
import { ConvertTemplate } from "../../utils/interface";
import { vendingmachineHeaderTemplate } from "./menuTabTemplate";

class MenuTab {
  vendingmachineWrap: HTMLElement;
  vendingmachineHeader: HTMLElement;

  constructor(readonly convertTemplate: ConvertTemplate) {
    this.convertTemplate = convertTemplate;
    this.vendingmachineWrap = selectDom("#app");
    this.vendingmachineHeader = selectDom(".header");

    addEvent(this.vendingmachineWrap, "click", this.handleMenuTab);
    addEvent(this.vendingmachineHeader, "click", this.handleMemberLoginButton);
    addEvent(this.vendingmachineHeader, "click", this.handleUserInfoSection);
  }

  handleUserInfoSection = (event: { target: HTMLElement }) => {
    if (event.target.classList.contains("user-info-text")) {
      this.handleUserMenuTab();
    }  else if (event.target.classList.contains("user-info-edit")) {
      history.pushState({ path: "#editMember" }, null, "#editMember");
      this.convertTemplate("#editMember");
    } else if (event.target.classList.contains("user-logout")) {
      this.handleLogout();
      this.convertTemplate(location.hash);
    }
  }

  handleLogout = () => {
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("USER_ID");
    localStorage.removeItem("USER_NAME");
    this.renderLogout();
  }

  handleUserMenuTab = () => {
    const userInfoEditButton = selectDom(".user-info-edit");
    const userLogoutButton = selectDom(".user-logout");

    userInfoEditButton.classList.toggle("edit-button-animation");
    userLogoutButton.classList.toggle("logout-button-animation");
  }

  handleMemberLoginButton = (event: { target: HTMLTableElement }) => {
    if (!event.target.classList.contains("member-login-button")) {
      return
    }

    history.pushState({ path: "#login" }, null, "#login");
    this.convertTemplate("#login");
  }

  handleMenuTab = (event: { target: HTMLButtonElement }) => {
    if (!event.target.classList.contains("nav__button")) {
      return;
    }

    const navList = selectDomAll(".nav__button");

    if (
      event.target.dataset.menu ===
        navList.find((navButton) => navButton.classList.contains("button-click")).dataset.menu
      ) {
      return;
    }

    navList.forEach((navButton: HTMLButtonElement) =>
      navButton.dataset.menu === event.target.dataset.menu
        ? navButton.classList.add("button-click")
        : navButton.classList.remove("button-click")
    );

    history.pushState(
      { path: event.target.dataset.menu },
      null,
      event.target.dataset.menu
    );

    this.convertTemplate(location.hash);
  };

  render(path: string) {
    if (path === "#login" || path === "#signup" || path === "#editMember") {
      this.vendingmachineHeader.replaceChildren();
      return;
    }

    if (this.vendingmachineHeader.children.length === 0) {
      this.vendingmachineHeader.insertAdjacentHTML(
        "beforeend",
        `${this.renderVendingmachineHeader(JSON.parse(localStorage.getItem("USER_NAME")))}`
      )
    }
  }

  renderLogout = () => {
    this.vendingmachineHeader.replaceChildren();
    this.vendingmachineHeader.insertAdjacentHTML(
      "beforeend",
      `${this.renderVendingmachineHeader(JSON.parse(localStorage.getItem("USER_NAME")))}`
    )
  }

  renderVendingmachineHeader = (userName: string) => {
    return vendingmachineHeaderTemplate(userName);
  }
}

export default MenuTab;
