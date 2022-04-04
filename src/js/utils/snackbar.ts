class Snackbar {
  $snackbar: HTMLElement;

  constructor() {
    this.$snackbar = document.querySelector('.snackbar');
  }

  push(msg: string | Error) {
    if (typeof msg === 'object') {
      this.$snackbar.classList.add('error');
      msg = msg.message;
    } else {
      this.$snackbar.classList.remove('error');
    }

    this.$snackbar.textContent = msg;
    this.$snackbar.classList.toggle('show');
    setTimeout(() => {
      this.$snackbar.classList.toggle('show');
    }, 3000);
  }
}

const snackbar = new Snackbar();

export default snackbar;
