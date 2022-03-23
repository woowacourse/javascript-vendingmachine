import Component from '../../core/Component';

class ItemManagementPage extends Component {
  template() {
    return `
      <section>
        <h2 hidden>추가할 상품 정보</h2>
        <form>
          <fieldset>
            <legend>추가할 상품 현황을 입력해주세요.</legend>
            <label hidden for="name">상품명</label>
            <input name="name" placeholder="상품명">
            <label hidden for="price">가격</label>
            <input name="price" placeholder="가격">
            <label hidden for="quantity">수량</label>
            <input name="quantity" placeholder="수량">
          </fieldset>
          <button>추가</button>
        </form>
      </section>
      <section>
        <h2>상품현황</h2>
        <table>
          <thead>
            <tr>
              <th>상품명</th>
              <th>가격</th>
              <th>수량</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </section>
    `;
  }
}

customElements.define('item-management', ItemManagementPage);
