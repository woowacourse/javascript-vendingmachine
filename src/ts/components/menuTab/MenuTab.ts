import { $, $$ } from "../../utils/dom";

type ConvertTemplate = (path: string) => void;

class MenuTab {
  convertTemplate: ConvertTemplate;
  menuNav: HTMLElement;
  menuNavButtons: NodeList;

  constructor({ convertTemplate }) {
    this.convertTemplate = convertTemplate;
    this.menuNav = $(".menu-nav");
    this.menuNavButtons = $$(".menu-nav__button");

    this.menuNav.addEventListener("click", this.handleMenuTab);
    window.addEventListener("popstate", this.handlePopState);
    this.changeTabStyle();
  }

  handleMenuTab = ({ target }) => {
    if (!target.classList.contains("menu-nav__button")) {
      return;
    }

    history.pushState({ path: target.dataset.menu }, null, target.dataset.menu);
    this.convertTemplate(location.hash);
    this.changeTabStyle();
  };

  handlePopState = () => {
    this.convertTemplate(location.hash || "#product");
    this.changeTabStyle();
  };

  changeTabStyle() {
    this.menuNavButtons.forEach((button: HTMLButtonElement) =>
      button.dataset.menu === location.hash ? button.classList.add("active") : button.classList.remove("active"),
    );
  }
}

export default MenuTab;
