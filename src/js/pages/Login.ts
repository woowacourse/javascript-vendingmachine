import LoginFormComponent from '../components/LoginFormComponent';

export default class Login {
  LoginFormComponent: LoginFormComponent;
  $app: HTMLElement;

  constructor() {
    this.$app = document.querySelector('#app');
    this.LoginFormComponent = new LoginFormComponent(this.$app, this.stateChange);
  }

  render = () => {
    this.LoginFormComponent.render();
    this.LoginFormComponent.refreshComponent();
  };

  private stateChange = () => {
    this.LoginFormComponent.refreshComponent();
  };
}
