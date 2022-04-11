export const manageErrors = (response) => {
  if (!response.ok) {
    const responseError = {
      message: `${response.status} ${response.statusText}`,
    };
    throw responseError;
  }

  return response;
};

class Snackbar {
  private debounce: ReturnType<typeof setTimeout>;

  constructor() {
    this.debounce = null;
  }

  showSnackBar = (message: string) => {
    const snackbar = document.querySelector('.snackbar');
    snackbar.classList.add('show');

    if (snackbar.textContent) {
      const [fadeout] = snackbar.getAnimations();
      fadeout.cancel();
      fadeout.play();
    }
    snackbar.textContent = message;

    if (this.debounce) {
      clearTimeout(this.debounce);
    }
    this.debounce = setTimeout(() => {
      this.debounce = null;
      snackbar.classList.remove('show');
    }, 2000);
  };
}

export const snackbar = new Snackbar();
