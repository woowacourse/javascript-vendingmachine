import Component from '../../core/Component';

class Snackbar extends Component {
  setup() {
    this.timerId = null;
  }

  template() {
    return '';
  }

  show(message) {
    if (this.timerId) clearTimeout(this.timerId);

    this.textContent = message;
    this.classList.add('show');

    this.timerId = setTimeout(() => {
      this.classList.remove('show');
    }, Number(this.props.duration));
  }
}

customElements.define('snack-bar', Snackbar);

export const showSnackbar = (message) => {
  document.querySelector('#snackbar').show(message);
};
