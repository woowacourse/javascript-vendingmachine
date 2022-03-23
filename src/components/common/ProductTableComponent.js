class ProductTableComponent {
  constructor($parent, { tableId, tableCaption }) {
    this.$parent = $parent;
    this.tableId = tableId;
    this.tableCaption = tableCaption;
  }
  mount() {
    this.$parent.insertAdjacentHTML('beforeend', this.generateTemplate());
  }
  generateTemplate() {
    return `<table id="${this.tableId}" class="product-list">
        <caption>
         ${this.tableCaption}
        </caption>
        <tbody>
          <tr>
            <th>상품명</th>
            <th>가격</th>
            <th>수량</th>
            <th></th>
          </tr>
        </tbody>
      </table>`;
  }
}
export default ProductTableComponent;
