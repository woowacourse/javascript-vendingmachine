import { $ } from '../util/index';

export default class Snackbar {
  private $snackbar: HTMLElement;

  constructor() {
    this.$snackbar = $('#snackbar');
  }

  on(message: string) {
    this.$snackbar.innerText = message;
    this.$snackbar.classList.toggle('show')
    setTimeout(() => {
      this.$snackbar.classList.toggle('show');
    }, 3000);
  }
}
