import { $, $$ } from "../../utils/dom";
import { Path } from "../App";

type ConvertTemplate = (path: Path) => void;

class MenuTabComponent {
  menuNav: HTMLElement;
  menuNavButtons: NodeList;

  constructor(private convertTemplate: ConvertTemplate) {
    this.menuNav = $(".menu-nav");
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
}

export default MenuTabComponent;
