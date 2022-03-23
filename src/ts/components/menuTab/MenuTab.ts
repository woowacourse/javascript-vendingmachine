import { $, addEvent } from "../../utils/dom";

type ConvertTemplate = (path: string) => void;

class MenuTab {
  convertTemplate: ConvertTemplate;
  app: HTMLElement;

  constructor({ convertTemplate }) {
    this.convertTemplate = convertTemplate;

    this.app = $("#app");
    addEvent(this.app, "click", this.handleMenuTab);
  }

  handleMenuTab = (e) => {
    e.preventDefault();
    if (!e.target.classList.contains("nav__button")) {
      return;
    }

    history.pushState(
      { path: e.target.dataset.menu },
      null,
      e.target.dataset.menu
    );

    this.convertTemplate(history.state.path);
  };
}

export default MenuTab;
