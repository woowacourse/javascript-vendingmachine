import { selectDom } from '.';
import { ID, CLASS } from '../constant/selector';

class Snackbar {
  private static timerId: ReturnType<typeof setTimeout> = null;

  private static snackbar: HTMLElement | null = selectDom(`#${ID.SNACKBAR}`);

  private static SNACKBAR_DURATION = 3000;

  static show(message: string) {
    this.snackbar.textContent = message;

    // 기존에 설정된 타이머가 있다면 타이머를 제거하고
    // 새로운 타이머를 설정
    if (this.timerId) {
      clearTimeout(this.timerId);

      this.setSnackbarTimer();
      return;
    }

    this.snackbar.classList.add(CLASS.SHOW);
    this.setSnackbarTimer();
  }

  private static setSnackbarTimer() {
    this.timerId = setTimeout(() => {
      this.snackbar.classList.remove(CLASS.SHOW);
      this.timerId = null;
    }, this.SNACKBAR_DURATION);
  }
}

export default Snackbar;
