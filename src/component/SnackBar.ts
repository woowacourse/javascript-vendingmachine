export class SnackBar {
  snackBarContainer: HTMLDivElement;
  constructor() {
    this.snackBarContainer = document.querySelector('#snackbar');
  }

  render(comment: string) {
    this.snackBarContainer.innerText = comment;
    this.snackBarContainer.classList.toggle('show');
    setTimeout(() => {
      this.snackBarContainer.classList.toggle('show');
    }, 3000);
  }
}
