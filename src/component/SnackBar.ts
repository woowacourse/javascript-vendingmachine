export class SnackBar {
  snackBarContainer: HTMLDivElement;
  constructor() {
    this.snackBarContainer = document.querySelector('#snackbar');
  }

  render(comment: string) {
    this.snackBarContainer.innerText = comment;
    if (!this.snackBarContainer.classList.contains('show')) {
      this.snackBarContainer.classList.toggle('show');
      setTimeout(() => {
        this.snackBarContainer.classList.toggle('show');
      }, 3000);
    }
  }
}
