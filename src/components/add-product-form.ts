import Component from '../abstract/component';
import { customElement } from '../decorators/decortators';

@customElement('add-product-form')
class AddProductForm extends Component {
  template(): string {
    return `
      <form>
        <label for="product-name">추가할 상품 정보를 입력해주세요.</label>
        <div class="d-flex">
          <input placeholder="상품명" name="product-name" class="form-control mr-1" />
          <input placeholder="가격" name="product-price" class="form-control mr-1" />
          <input placeholder="수량" name="product-quantity" class="form-control mr-4" />
          <button type="button" class="btn cyan">추가</button>
        </div>
      </form>
    `;
  }
}

export default AddProductForm;
