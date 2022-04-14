const Snackbar = () => {
  const $snackbar = document.querySelector('#snackbar');
  let removeToast = null;

  return (text: string) => {
    if (removeToast) return;

    $snackbar.classList.add('show');
    $snackbar.textContent = text;

    removeToast = setTimeout(() => {
      $snackbar.classList.remove('show');
      clearTimeout(removeToast);
      removeToast = null;
    }, 3000);
  };
};

const showSnackbar = Snackbar();

export default showSnackbar;
