const showSnackbar = (container, message, callback = () => {}) => {
  container.innerText = message;
  container.classList.toggle("show");
  setTimeout(() => {
    container.classList.toggle("show");
    callback();
  }, 1000);
};

export default showSnackbar;
