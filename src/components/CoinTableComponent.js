class CoinTableComponent {
  constructor($parent, { tableId, tableCaption }) {
    this.$parent = $parent;
    this.tableId = tableId;
    this.tableCaption = tableCaption;
  }
  mount() {
    this.$parent.insertAdjacentHTML('beforeend', this.generateTemplate());
  }
  generateTemplate() {
    return `<table id="${this.tableId}>
        <caption>
          ${this.tableCaption}
        </caption>
        <tbody>
          <tr>
            <th>동전</th>
            <th>개수</th>
          </tr>
          <tr>
            <td>500원</td>
            <td id="hold-coin-500-count">0개</td>
          </tr>
          <tr>
            <td>100원</td>
            <td id="hold-coin-100-count">0개</td>
          </tr>
          <tr>
            <td>50원</td>
            <td id="hold-coin-50-count">0개</td>
          </tr>
          <tr>
            <td>10원</td>
            <td id="hold-coin-10-count">0개</td>
          </tr>
        </tbody>
      </table>`;
  }
}

export default CoinTableComponent;
