import { selectDom, selectDomAll, addEvent,  } from "../../utils/dom";

type ConvertTemplate = (path: string) => void;

class MenuTab {
  convertTemplate: ConvertTemplate;
  vendingmachineWrap: HTMLElement;

  constructor({ convertTemplate }) {
    this.convertTemplate = convertTemplate;
    this.vendingmachineWrap = selectDom("#app");
    addEvent(this.vendingmachineWrap, "click", this.handleMenuTab);
  }

  handleMenuTab = (e: { target: HTMLButtonElement }) => {
    const navList = selectDomAll(".nav__button");
    if (!e.target.classList.contains("nav__button")) {
      return;
    }

    navList.forEach((button: HTMLButtonElement) =>
      button.dataset.menu === e.target.dataset.menu
        ? button.classList.add("button-click")
        : button.classList.remove("button-click")
    );

    history.pushState(
      { path: e.target.dataset.menu },
      null,
      e.target.dataset.menu
    );

    this.convertTemplate(location.hash);
  };
}

export default MenuTab;
