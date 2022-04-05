import RegisterFormComponent from '../components/RegisterFormComponent';

export default class Register {
  RegisterFormComponent: RegisterFormComponent;
  $loginInputContainer: HTMLElement;

  constructor() {
    this.$loginInputContainer = document.querySelector('#login-input-container');
    this.RegisterFormComponent = new RegisterFormComponent(this.$loginInputContainer, this.stateChange);
  }

  render = () => {
    this.RegisterFormComponent.render();
    this.RegisterFormComponent.refreshComponent();
  };

  private stateChange = () => {
    this.RegisterFormComponent.refreshComponent();
  };
}
