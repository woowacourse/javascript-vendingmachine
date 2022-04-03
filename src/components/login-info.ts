import Component from '../abstract/component';
import { customElement } from '../decorators/decortators';
import { getUserInfo } from '../member';

@customElement('login-info')
class LoginInfo extends Component {
  template(thumbnail = 'A'): string {
    return `
    <button type="button" class="btn btn-primary">${thumbnail}</button>
    `;
  }

  async getFirstSpelling() {
    const userInfo = await getUserInfo();
    return userInfo.name[0];
  }

  async mount() {
    this.render();
  }

  async render() {
    const thumbnail = await this.getFirstSpelling();
    this.innerHTML = this.template(thumbnail);
  }
}
export default LoginInfo;
