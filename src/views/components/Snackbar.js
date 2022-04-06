import Component from '../../core/Component';

export default class Snackbar extends Component {
  template() {
    return '';
  }

  trigger(message) {
    console.log('triggered');

    this.textContent = message;
    this.classList.toggle('show');

    setTimeout(() => {
      console.log('ended');
      this.classList.toggle('show');
    }, 3000);
  }
}

customElements.define('snack-bar', Snackbar);
