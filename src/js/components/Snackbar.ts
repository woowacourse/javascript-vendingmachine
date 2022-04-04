// $snackbarButton.addEventListener('click', () => {
//   $snackbar.classList.toggle('show');
//   setTimeout(() => {
//     $snackbar.classList.toggle('show');
//   }, 3000);
// });

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

const snackbar = Snackbar();

export default snackbar;

// const toast = () => {
//     const toastContainer = document.getElementById('toast');
//     let removeToast;

//     return (text) => {
//       if (removeToast) return;

//       toastContainer.classList.add('reveal');
//       toastContainer.textContent = text;

//       removeToast = setTimeout(() => {
//         toastContainer.classList.remove('reveal');
//         clearTimeout(removeToast);
//         removeToast = undefined;
//       }, 1500);
//     };
//   };

//   export default toast;
