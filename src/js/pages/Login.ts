import LoginFormComponent from '../components/LoginFormComponent';

export default class Login {
  LoginFormComponent: LoginFormComponent;
  $loginInputContainer: HTMLElement;

  constructor() {
    this.$loginInputContainer = document.querySelector('#login-input-container');
    this.LoginFormComponent = new LoginFormComponent(this.$loginInputContainer, this.stateChange);
  }

  render = () => {
    this.LoginFormComponent.render();
    this.LoginFormComponent.refreshComponent();
  };

  private stateChange = () => {
    this.LoginFormComponent.refreshComponent();
  };
}
