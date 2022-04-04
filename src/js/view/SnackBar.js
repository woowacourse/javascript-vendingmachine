import { selectDom } from '../utils/dom';

export default class Snackbar {
  #app;
  #messageList;
  #canShow;

  constructor() {
    this.#app = selectDom('#app');
    this.#messageList = [];
    this.#canShow = true;
    window.requestAnimationFrame(this.#handleSnackbarUpdate);
  }

  addToMessageList(message) {
    this.#messageList.push(message);
  }

  #handleSnackbarUpdate = () => {
    if (this.#messageList.length > 0 && this.#canShow) {
      const nextMessage = this.#messageList.shift();
      this.#renderSnackbar(nextMessage);
    }
    window.requestAnimationFrame(this.#handleSnackbarUpdate);
  };

  #renderSnackbar = (message) => {
    this.#canShow = false;

    const snackbar = document.createElement('div');
    snackbar.className = 'snackbar';
    snackbar.textContent = message;

    this.#app.append(snackbar);

    snackbar.classList.toggle('show');
    this.#fadeOutSnackbar(snackbar).then(() => this.#removeSnackbarWithDelay(snackbar));
  };

  #fadeOutSnackbar(snackbar) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(snackbar.classList.toggle('show'));
      }, 1000);
    });
  }

  #removeSnackbarWithDelay(snackbar) {
    new Promise(() => {
      setTimeout(() => {
        snackbar.remove();
        this.#canShow = true;
      }, 500);
    });
  }
}
