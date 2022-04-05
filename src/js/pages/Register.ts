import RegisterFormComponent from '../components/RegisterFormComponent';
import { PATH_NAME } from '../constants';
import routes from '../routes';

export default class Register {
  RegisterFormComponent: RegisterFormComponent;
  $loginInputContainer: HTMLElement;

  constructor() {
    this.$loginInputContainer = document.querySelector('#login-input-container');
    this.RegisterFormComponent = new RegisterFormComponent(this.$loginInputContainer, this.stateChange);
  }

  render = () => {
    this.RegisterFormComponent.render();
  };

  private stateChange = () => {
    routes.go(PATH_NAME.LOGIN);
  };
}
