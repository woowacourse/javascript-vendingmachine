import { SELECTOR } from '../constants/viewConstants';
import { $ } from './common';

export default function showSnackbar(message) {
  const snackbar = $(SELECTOR.ID.SNACKBAR);
  if (snackbar.classList.contains('show')) return;
  snackbar.textContent = message;
  snackbar.classList.add('show');

  setTimeout(() => {
    snackbar.classList.remove('show');
  }, 3000);
}
