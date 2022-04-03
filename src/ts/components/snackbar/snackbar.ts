import { selectDom } from "../../utils/dom";
import { snackbarTemplate } from "./snackbarTemplate";

const showSnackbar = (message: string) => {
  const snackbarFragment = document.createElement("div");
  const snackbarWrap = selectDom("#snackbar-wrap")
  snackbarFragment.insertAdjacentHTML("beforeend", snackbarTemplate(message));
  snackbarFragment.classList.add("snackbar-animation");
  snackbarWrap.insertAdjacentElement("beforeend", snackbarFragment);
  removeSnackbar(snackbarWrap);
}

const removeSnackbar = (snackbarWrap: HTMLElement) => {
  let showSnackbarTime = new Date().getTime();
  const callback = () => {
    const currentTime = new Date().getTime();
    if (currentTime - 2000 > showSnackbarTime) {
      snackbarWrap.firstChild.remove();
    } else {
      requestAnimationFrame(callback);
    }
  };
  requestAnimationFrame(callback);
}

export { showSnackbar };