import template from '../template';

export default class Login {
  $app: HTMLElement;
  constructor() {
    this.$app = document.querySelector('#app');
  }

  render() {
    this.$app.insertAdjacentHTML('beforeend', template.loginContainer());
  }
}
