import Component from '../../core/Component';

export default class Snackbar extends Component {
  template() {
    return '';
  }

  trigger(message) {
    this.textContent = message;
    this.classList.toggle('show');

    setTimeout(() => {
      this.classList.toggle('show');
    }, Number(this.props.duration));
  }
}

customElements.define('snack-bar', Snackbar);
