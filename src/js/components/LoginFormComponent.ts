import throwableFunctionHandler from '../utils/throwableFunctionHandler';

class LoginFormComponent {
  parentElement: HTMLElement;
  noticeStateChanged: Function;
  $loginForm: HTMLElement;
  $sectionContainer: HTMLElement;
  $userMenu: HTMLElement;
  $loginInputSection: HTMLElement;

  constructor(parentElement: HTMLElement, noticeStateChanged: Function) {
    this.parentElement = parentElement;
    this.noticeStateChanged = noticeStateChanged;
  }

  private bindEventAndElement = () => {
    this.$loginInputSection = this.parentElement.querySelector('#login-input-container');
    this.$loginForm = this.$loginInputSection.querySelector('#login-form');
    this.$userMenu = document.querySelector('.user-menu');
    this.$sectionContainer = document.querySelector('.section-container');

    this.$loginForm.addEventListener('submit', this.onSubmitNewProduct);
  };

  private onSubmitNewProduct = (e: SubmitEvent) => {
    e.preventDefault();

    // if (throwableFunctionHandler(() => vendingMachine.addProduct(newProduct))) {
    //   this.noticeStateChanged('add', newProduct);
    // }
  };

  private hideOtherSection = () => {
    this.$userMenu.classList.add('hide');
    this.$sectionContainer.classList.add('hide');
  };

  refreshComponent = () => {};

  render = () => {
    this.bindEventAndElement();
    this.hideOtherSection();
    this.$userMenu.classList.add('hide');
    this.$loginInputSection.classList.remove('hide');
  };
}

export default LoginFormComponent;
