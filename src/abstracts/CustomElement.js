import { $ } from '../utils/dom';

class CustomElement extends HTMLElement {
  connectedCallback() {
    this.render();
    this.setEvent();
  }

  render() {
    this.insertAdjacentHTML('beforeend', this.template());
  }

  template() {}

  setEvent() {}

  showSnackbar(message) {
    const $snackbar = $('#snackbar');

    $snackbar.textContent = message;
    $snackbar.classList.toggle('show');
    setTimeout(() => {
      $snackbar.classList.toggle('show');
    }, 3000);
  }

  show() {
    this.removeAttribute('hidden');
  }

  hide() {
    this.setAttribute('hidden', true);
  }
}

export default CustomElement;
