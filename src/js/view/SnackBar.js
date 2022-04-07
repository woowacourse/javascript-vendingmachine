import { SNACKBAR_DELAY_TIME } from '../constants';
import { selectDom } from '../utils/dom';

const SnackBar = {
  dispatch(message, type = 'success') {
    const snackbar = selectDom('#snackbar');

    snackbar.textContent = message;

    snackbar.classList.toggle('error', type === 'error');
    snackbar.classList.toggle('show');
    setTimeout(() => {
      snackbar.classList.toggle('show');
    }, SNACKBAR_DELAY_TIME);
  },
};

export default SnackBar;
