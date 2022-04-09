import Component from '../abstract/component';
import { MEMBER } from '../constatns/auth-constants';
import { customElement } from '../decorators/decortators';
import { getUserInfo } from '../member';
import Router from '../router';
import { showSnack } from '../utils';

@customElement('login-info')
class LoginInfo extends Component {
  template(thumbnail = 'A'): string {
    return `
    <button type="button" class="btn btn-primary login-info">${thumbnail}</button>
    <section class="hide">
      <option class="modify-member-info mb-2"> 회원 정보 수정 </option>
      <option class="log-out"> 로그아웃 </option>
    </section>
    `;
  }

  setEvent() {
    this.addEvent('click', '.login-info', this.onClickUserInfo);
    this.addEvent('click', '.modify-member-info', this.onClickModifyInfo);
    this.addEvent('click', '.log-out', this.onClickLogOut);
  }

  onClickUserInfo = () => {
    this.querySelector('section')?.classList.toggle('hide');
  };

  onClickModifyInfo = () => {
    Router.pushState('/modify-member-form');
  };

  onClickLogOut = () => {
    localStorage.removeItem('user-info');
    Router.pushState('/');
    showSnack(MEMBER.SUCCESS_LOG_OUT);
  };

  async getFirstSpelling() {
    const userInfo = await getUserInfo();
    return userInfo.name[0];
  }

  mount() {
    this.render();
  }

  async render() {
    const thumbnail = await this.getFirstSpelling();
    this.innerHTML = this.template(thumbnail);
  }
}
export default LoginInfo;
