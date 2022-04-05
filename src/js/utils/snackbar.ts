import { SELECTOR } from '../constants/viewConstants';
import { $ } from './common';

export default function showSnackbar(message: string) {
  const snackbar = $(SELECTOR.ID.SNACKBAR);

  if (snackbar.classList.contains(SELECTOR.CLASS_STRING.SHOW)) return;
  snackbar.textContent = message;
  snackbar.classList.add(SELECTOR.CLASS_STRING.SHOW);

  setTimeout(() => {
    snackbar.classList.remove(SELECTOR.CLASS_STRING.SHOW);
  }, 3000);
}
