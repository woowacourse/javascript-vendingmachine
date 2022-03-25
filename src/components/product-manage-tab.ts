import Component from '../abstract/component';
import { customElement, event } from '../decorators/decortators';

@customElement('product-manage-tab')
class ProductManageTab extends Component {
  template(): string {
    return `
    <form class="add-product-form">
      <label for="product-name">추가할 상품 정보를 입력해주세요.</label>
      <div class="d-flex">
        <input placeholder="상품명" name="product-name" class="form-control mr-1" />
        <input placeholder="가격" name="product-price" class="form-control mr-1" />
        <input placeholder="수량" name="product-quantity" class="form-control mr-4" />
        <button type="button" class="btn cyan">추가</button>
      </div>
    </form>

    <section class="product-inventory">
      <h2 class="text-center">상품 현황</h2>
      <table>
        <thead>
          <tr>
            <th>상품명</th>
            <th>가격</th>
            <th>수량</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr data-product-id="1">
            <td>콜라</td>
            <td>1500</td>
            <td>20</td>
            <td>
              <div class="btn-group">
                <button class="btn xs mr-2">수정</button>
                <button class="btn xs">삭제</button>
              </div>
            </td>
          </tr>

          <tr data-product-id="2">
            <td>사이다</td>
            <td>1000</td>
            <td>10</td>
            <td>
              <div class="btn-group">
                <button class="btn xs mr-2">수정</button>
                <button class="btn xs">삭제</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </section>`;
  }

  @event('click', '.my-button')
  onClickButton() {}
}

export default ProductManageTab;
