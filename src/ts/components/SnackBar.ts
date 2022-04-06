import { $ } from "../utils/dom";
import { createTextElement } from "../utils/common";

class Snackbar {
  snackbarContainer: HTMLDivElement;

  constructor() {
    this.snackbarContainer = $(".snackbar-container");
  }

  show(message: string) {
    const snackBar = createTextElement("span", "snackbar", message);

    this.snackbarContainer.insertAdjacentElement("beforeend", snackBar);
    setTimeout(() => {
      this.snackbarContainer.firstElementChild.remove();
    }, 2000);
  }
}

export default Snackbar;
