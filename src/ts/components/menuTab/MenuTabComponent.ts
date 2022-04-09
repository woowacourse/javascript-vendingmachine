import { $, $$ } from "../../utils/dom";
import { ConvertTemplate, Path } from "../App";
import { menuTabTemplate } from "./menuTabTemplate";

class MenuTabComponent {
  menuNav: HTMLElement;
  menuNavButtons: NodeList;

  constructor(private convertTemplate: ConvertTemplate) {
    this.menuNav = $(".menu-nav");
    this.menuNav.replaceChildren();
    this.menuNav.insertAdjacentHTML("beforeend", menuTabTemplate);

    this.menuNavButtons = $$(".menu-nav__button");

    window.addEventListener("popstate", this.handlePopState);
    this.menuNav.addEventListener("click", this.handleMenuTab);
    this.changeTabStyle();
  }

  handleMenuTab = ({ target }) => {
    if (!target.classList.contains("menu-nav__button")) {
      return;
    }

    history.pushState({ path: target.dataset.menu }, null, target.dataset.menu);
    this.convertTemplate(target.dataset.menu);
    this.changeTabStyle();
  };

  handlePopState = () => {
    this.convertTemplate((location.hash as Path) || "#product");
    this.changeTabStyle();
  };

  changeTabStyle() {
    this.menuNavButtons.forEach((button: HTMLButtonElement) =>
      button.dataset.menu === location.hash ? button.classList.add("active") : button.classList.remove("active"),
    );
  }

  show() {
    this.menuNav.classList.remove("hide");
  }
}

export default MenuTabComponent;
