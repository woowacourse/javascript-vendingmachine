import UserInfoComponent from '../components/UserInfoComponent';
import { PATH_NAME } from '../constants';
import routes from '../routes';

export default class UserInfo {
  UserInfoComponent: UserInfoComponent;
  $loginInputContainer: HTMLElement;

  constructor() {
    this.$loginInputContainer = document.querySelector('#login-input-container');
    this.UserInfoComponent = new UserInfoComponent(this.$loginInputContainer, this.stateChange);
  }

  render = () => {
    this.UserInfoComponent.render();
  };

  private stateChange = () => {};
}
