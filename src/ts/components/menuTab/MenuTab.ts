import { $, $$, addEvent } from "../../utils/dom";

type ConvertTemplate = (path: string) => void;

class MenuTab {
  convertTemplate: ConvertTemplate;
  app: HTMLElement;

  constructor({ convertTemplate }) {
    this.convertTemplate = convertTemplate;
    this.app = $("#app");
    addEvent(this.app, "click", this.handleMenuTab);
  }

  handleMenuTab = (e: { target: HTMLButtonElement }) => {
    const navList = $$(".nav__button");
    if (!e.target.classList.contains("nav__button")) {
      return;
    }

    navList.forEach((button: HTMLButtonElement) =>
      button.dataset.menu === e.target.dataset.menu
        ? button.classList.add("button-click")
        : button.classList.remove("button-click"),
    );

    history.pushState({ path: e.target.dataset.menu }, null, e.target.dataset.menu);

    this.convertTemplate(location.hash);
  };
}

export default MenuTab;
