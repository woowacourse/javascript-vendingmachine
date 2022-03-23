import CustomElement from '../abstracts/CustomElement';

class ProductCurrentSituation extends CustomElement {
  // eslint-disable-next-line max-lines-per-function
  template() {
    return `
      <h2>상품 현황</h2>
      <table class="product-current-situation">
        <thead>
          <tr>
            <th>상품명</th>
            <th>가격</th>
            <th>수량</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    `;
  }
}

customElements.define('product-current-situation', ProductCurrentSituation);

export default ProductCurrentSituation;
