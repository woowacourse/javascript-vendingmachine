import { selectDom } from '../utils/dom';

export default class SnackBar {
  constructor() {
    this.app = selectDom('#app');
    this.messageList = [];
    this.canShow = true;
    window.requestAnimationFrame(this.handleSnackBarUpdate);
  }

  addToMessageList(message) {
    this.messageList.push(message);
  }

  handleSnackBarUpdate = () => {
    if (this.messageList.length > 0 && this.canShow) {
      const nextMessage = this.messageList.shift();
      this.renderSnackBarUpdate(nextMessage);
    }
    window.requestAnimationFrame(this.handleSnackBarUpdate);
  };

  renderSnackBarUpdate = (message) => {
    this.canShow = false;

    const snackBar = document.createElement('div');
    snackBar.className = 'snackbar';
    snackBar.textContent = message;

    this.app.append(snackBar);
    snackBar.classList.toggle('show');

    setTimeout(() => {
      snackBar.classList.toggle('show');
      setTimeout(() => {
        snackBar.remove();
        this.canShow = true;
      }, 500);
    }, 1000);
  };
}
