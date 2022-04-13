class Snackbar {
  $snackbar: HTMLElement;
  timerId: any;

  constructor() {
    this.$snackbar = document.querySelector('.snackbar');
    this.timerId = null;
  }

  push = (msg: string | Error) => {
    if (this.timerId) {
      clearTimeout(this.timerId);
    }

    if (typeof msg === 'object') {
      this.$snackbar.classList.add('error');
      msg = msg.message;
    } else {
      this.$snackbar.classList.remove('error');
    }

    this.$snackbar.textContent = msg;
    this.$snackbar.classList.add('show');
    this.timerId = setTimeout(() => {
      this.$snackbar.classList.toggle('show');
      this.timerId = null;
    }, 3000);
  };
}

const snackbar = new Snackbar();

export default snackbar;
