import { selectDom } from '.';
import { ID, CLASS } from '../constant/selector';

class Snackbar {
  private static timerId: ReturnType<typeof setTimeout>;

  private static snackbar: HTMLElement | null = selectDom(`#${ID.SNACKBAR}`);

  static show(message: string) {
    this.snackbar.textContent = message;

    if (this.timerId) return;
    this.snackbar.classList.toggle(CLASS.SHOW);
    this.timerId = setTimeout(() => {
      this.snackbar.classList.toggle(CLASS.SHOW);
      this.timerId = null;
    }, 3000);
  }
}

export default Snackbar;
