import CustomElement from '../../abstracts/CustomElement';

class PurchasePossibleProductSituation extends CustomElement {
  template() {
    return `
      <p>투입한 금액: <span class="purchase-money">0</span>원</p>
      <h2>구매 가능 상품 현황</h2>
      <div class="purchase-possible-product-container">
        <table class="purchase-possible-product-situation">
          <thead>
            <tr>
              <th>상품명</th>
              <th>가격</th>
              <th>수량</th>
              <th>구매</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    `;
  }
}

customElements.define('purchase-possible-product-situation', PurchasePossibleProductSituation);

export default PurchasePossibleProductSituation;
