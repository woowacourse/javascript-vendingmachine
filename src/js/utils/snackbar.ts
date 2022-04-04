class Snackbar {
  $snackbar: HTMLElement;

  constructor() {
    this.$snackbar = document.querySelector('.snackbar');
  }

  push(message: string, isError: boolean = false) {
    if (isError) {
      this.$snackbar.classList.add('error');
    } else {
      this.$snackbar.classList.remove('error');
    }

    this.$snackbar.textContent = message;
    this.$snackbar.classList.toggle('show');
    setTimeout(() => {
      this.$snackbar.classList.toggle('show');
    }, 3000);
  }
}

const snackbar = new Snackbar();

export default snackbar;
