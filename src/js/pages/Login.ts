import LoginFormComponent from '../components/LoginFormComponent';
import { PATH_NAME } from '../constants';
import routes from '../routes';

export default class Login {
  LoginFormComponent: LoginFormComponent;
  $loginInputContainer: HTMLElement;

  constructor() {
    this.$loginInputContainer = document.querySelector('#login-input-container');
    this.LoginFormComponent = new LoginFormComponent(this.$loginInputContainer, this.locationChange);
  }

  render = () => {
    this.LoginFormComponent.render();
    this.LoginFormComponent.refreshComponent();
  };

  private locationChange = () => {
    routes.go(PATH_NAME.PRODUCT_MANAGE);
  };
}
