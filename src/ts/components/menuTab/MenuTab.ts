import { selectDom, selectDomAll, addEvent,  } from "../../utils/dom";
import { ConvertTemplate } from "../../utils/interface";
import { menuTabTemplate } from "./menuTabTemplate";
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
      console.log(event.target);
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

  handleMenuTab = (e: { target: HTMLButtonElement }) => {
    if (!e.target.classList.contains("nav__button")) {
      return;
    }

    const navList = selectDomAll(".nav__button");

    if (
      e.target.dataset.menu ===
        navList.find((navButton) => navButton.classList.contains("button-click")).dataset.menu
      ) {
      return;
    }

    navList.forEach((navButton: HTMLButtonElement) =>
      navButton.dataset.menu === e.target.dataset.menu
        ? navButton.classList.add("button-click")
        : navButton.classList.remove("button-click")
    );

    history.pushState(
      { path: e.target.dataset.menu },
      null,
      e.target.dataset.menu
    );

    this.convertTemplate(location.hash);
  };

  render(path: string) {
    if (path === "#login" || path === "#signup") {
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
    return `<h1 class="header-text">🍿 자판기 🍿</h1> 
      <div class="member-wrap">
        ${userName 
          ? `<div class="user-info-section">
              <div class="user-info-text">
                ${userName.split("")[0]}
              </div>
              <button class="user-info-edit">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M490.3 40.4C512.2 62.27 512.2 97.73 490.3 119.6L460.3 149.7L362.3 51.72L392.4 21.66C414.3-.2135 449.7-.2135 471.6 21.66L490.3 40.4zM172.4 241.7L339.7 74.34L437.7 172.3L270.3 339.6C264.2 345.8 256.7 350.4 248.4 353.2L159.6 382.8C150.1 385.6 141.5 383.4 135 376.1C128.6 370.5 126.4 361 129.2 352.4L158.8 263.6C161.6 255.3 166.2 247.8 172.4 241.7V241.7zM192 63.1C209.7 63.1 224 78.33 224 95.1C224 113.7 209.7 127.1 192 127.1H96C78.33 127.1 64 142.3 64 159.1V416C64 433.7 78.33 448 96 448H352C369.7 448 384 433.7 384 416V319.1C384 302.3 398.3 287.1 416 287.1C433.7 287.1 448 302.3 448 319.1V416C448 469 405 512 352 512H96C42.98 512 0 469 0 416V159.1C0 106.1 42.98 63.1 96 63.1H192z"/></svg>
              </button>
              <div class="user-logout">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M160 416H96c-17.67 0-32-14.33-32-32V128c0-17.67 14.33-32 32-32h64c17.67 0 32-14.33 32-32S177.7 32 160 32H96C42.98 32 0 74.98 0 128v256c0 53.02 42.98 96 96 96h64c17.67 0 32-14.33 32-32S177.7 416 160 416zM502.6 233.4l-128-128c-12.51-12.51-32.76-12.49-45.25 0c-12.5 12.5-12.5 32.75 0 45.25L402.8 224H192C174.3 224 160 238.3 160 256s14.31 32 32 32h210.8l-73.38 73.38c-12.5 12.5-12.5 32.75 0 45.25s32.75 12.5 45.25 0l128-128C515.1 266.1 515.1 245.9 502.6 233.4z"/></svg>
              </div>
            </div>` 
          : `<button class="member-login-button">로그인</button>`}
      </div>
      ${menuTabTemplate}`;
  }
}

export default MenuTab;
