import Component from '../../core/Component';

class Snackbar extends Component {
  template() {
    return '';
  }

  show(message) {
    this.textContent = message;
    this.classList.toggle('show');

    setTimeout(() => {
      this.classList.toggle('show');
    }, Number(this.props.duration));
  }
}

customElements.define('snack-bar', Snackbar);

export const showSnackbar = (message) => {
  document.querySelector('#snackbar').show(message);
};
