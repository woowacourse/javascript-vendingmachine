import CustomElement from '../../abstracts/CustomElement';

class ChangeReturnTable extends CustomElement {
  // eslint-disable-next-line max-lines-per-function
  template() {
    return `
      <h2>잔돈 반환</h2>
      <table class="change-return-table">
        <thead>
          <tr>
            <th>동전</th>
            <th>개수</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>500원</td>
            <td class="change-return-table__coin-500-count-td">0개</td>
          </tr>
          <tr>
            <td>100원</td>
            <td class="change-return-table__coin-100-count-td">0개</td>
          </tr>
          </tr>
          <tr>
            <td>50원</td>
            <td class="change-return-table__coin-50-rount-td">0개</td>
          </tr>
          <tr>
            <td>10원</td>
            <td class="change-return-table__coin-10-rount-td">0개</td>
          </tr>
        </tbody>
      </table>
      <div class="change-return-button-container">
        <button class="change-return-button">반환</button>
      </div>
    `;
  }
}

customElements.define('change-return-table', ChangeReturnTable);

export default ChangeReturnTable;
