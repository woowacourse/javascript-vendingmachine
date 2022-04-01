import Component from '../abstract/component';
import { customElement } from '../decorators/decortators';

@customElement('purchase-product-form')
class PurchaseProductForm extends Component {
  template(): string {
    return `
      <form onsubmit="return false">
        <label for="purchase-money-input">상품을 구매할 금액을 투입해주세요</label>
        <div class="d-flex mb-4">
          <input placeholder="금액" name="purchase-money-input" class="form-control mr-4" />
          <button type="button" class="btn btn-primary">추가</button>
        </div>
        <label class="mb-0">투입한 금액: 0원</label>
      </form>
    `;
  }

  mount() {
    this.render();
  }

  render() {
    this.innerHTML = this.template();
  }
}

export default PurchaseProductForm;
