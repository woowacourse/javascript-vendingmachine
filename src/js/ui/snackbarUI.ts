import { $, createElement } from "../util/dom";
import { SNACKBAR_TYPE, SNACKBAR_CONSIST_TIME } from "../constant";

class SnackBar {
  $container;
  timer;
  constructor() {
    this.$container = $("#snackbar-container");
    this.timer;
  }

  open(type, message) {
    if (this.$container.childElementCount >= 3) {
      this.close();
    }
    const snackbar = createElement(
      "div",
      {
        class: `snackbar show ${
          type === SNACKBAR_TYPE.ERROR ? "error" : "primary"
        }`,
      },
      message
    );

    this.$container.append(snackbar);
    this.timer = setTimeout(() => {
      this.close();
    }, SNACKBAR_CONSIST_TIME);
  }

  close() {
    this.$container.children[0].remove();
  }
}

export default new SnackBar();
