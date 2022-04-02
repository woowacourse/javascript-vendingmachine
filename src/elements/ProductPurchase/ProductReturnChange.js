import CustomElement from '../../abstracts/CustomElement';

class ProductReturnChange extends CustomElement {
  template() {
    return `
      <h2>잔돈 반환</h2>
      <table class="product-return-change-situation">
        <thead>
          <tr>
            <th>동전</th>
            <th>개수</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>500원</td>
            <td class="change-500-count-td">0개</td>
          </tr>
          <tr>
            <td>100원</td>
            <td class="change-100-count-td">0개</td>
          </tr>
          </tr>
          <tr>
            <td>50원</td>
            <td class="change-50-count-td">0개</td>
          </tr>
          <tr>
            <td>10원</td>
            <td class="change-10-count-td">0개</td>
          </tr>
        </tbody>
      </table>
      <button class="product-return-change-button">반환</button>
    `;
  }
}

customElements.define('product-return-change', ProductReturnChange);

export default ProductReturnChange;
