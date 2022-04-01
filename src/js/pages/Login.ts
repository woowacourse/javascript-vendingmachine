import template from '../template';

export default class Login {
  $headerTitle: HTMLElement;
  $contentsContainer: HTMLElement;

  constructor() {
    this.$headerTitle = document.querySelector('#header-title');
    this.$contentsContainer = document.querySelector('.contents-container');
  }

  render() {
    this.$contentsContainer.insertAdjacentHTML('beforeend', template.loginContainer());
    this.$headerTitle.textContent = '로그인';
  }
}
