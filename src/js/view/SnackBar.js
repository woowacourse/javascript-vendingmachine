const Snackbar = {
  dispatch(message, type = 'success') {
    const snackbar = document.querySelector('#snackbar');

    snackbar.classList.toggle('fail', type === 'fail');

    snackbar.textContent = message;

    snackbar.classList.toggle('show');
    setTimeout(() => {
      snackbar.classList.toggle('show');
    }, 1000);
  },
};

export default Snackbar;
