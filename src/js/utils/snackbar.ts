class Snackbar {
  $snackbar: HTMLElement;

  constructor() {
    this.$snackbar = document.querySelector('.snackbar');
  }

  async push(msg: string | Error) {
    if (typeof msg === 'object') {
      this.$snackbar.classList.add('error');
      msg = msg.message;
    } else {
      this.$snackbar.classList.remove('error');
    }

    this.$snackbar.textContent = msg;
    this.$snackbar.classList.add('show');
    setTimeout(() => {
      this.$snackbar.classList.toggle('show');
    }, 3000);
  }
}

const snackbar = new Snackbar();

export default snackbar;
