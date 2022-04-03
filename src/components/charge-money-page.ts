import Component from '../abstract/component';
import { customElement } from '../decorators/decortators';
import './charge-money-form';
import './changes-inventory';
import { getUserInfo } from '../member';

@customElement('charge-money-page')
class ChargeMoneyPage extends Component {
  template(isLogin: boolean): string {
    if (!isLogin) {
      return `<h2>🚫이 페이지는 관리자만 접근할 수 있습니다🚫 </h2>`;
    }
    return `
      <charge-money-form class="mb-12"></charge-money-form>
      <changes-inventory></changes-inventory>
    `;
  }

  mount() {
    this.render();
  }

  async render() {
    const isLogin = !!(await getUserInfo());
    this.innerHTML = this.template(isLogin);
  }
}

export default ChargeMoneyPage;
