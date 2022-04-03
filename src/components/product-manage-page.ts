import Component from '../abstract/component';
import { customElement } from '../decorators/decortators';
import { getUserInfo } from '../member';
import './add-product-form';
import './product-inventory';

@customElement('product-manage-page')
class ProductManagePage extends Component {
  template(isLogin: boolean): string {
    if (!isLogin) {
      return `<h2>🚫이 페이지는 관리자만 접근할 수 있습니다🚫 </h2>`;
    }
    return `
      <add-product-form></add-product-form>
      <product-inventory></product-inventory>
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

export default ProductManagePage;
