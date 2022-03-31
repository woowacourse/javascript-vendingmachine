import { selectDom, selectDomAll, addEvent,  } from "../../utils/dom";

type ConvertTemplate = (path: string) => void;
class MenuTab {
  vendingmachineWrap: HTMLElement;

  constructor(readonly convertTemplate: ConvertTemplate) {
    this.convertTemplate = convertTemplate;
    this.vendingmachineWrap = selectDom("#app");
    addEvent(this.vendingmachineWrap, "click", this.handleMenuTab);
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
}

export default MenuTab;
