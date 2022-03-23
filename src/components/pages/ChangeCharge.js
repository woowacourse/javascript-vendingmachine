import Component from '../../core/Component';

class ChangeCharge extends Component {
  template() {
    return `
      <section>
        <h2 hidden>잔돈 충전</h2>
        <form>
          <label for="amount">자판기가 보유할 금액을 입력해주세요.</label>
          <input name="amount" placeholder="금액">
          <button>충전</button>
        </form>
        <p>현재 보유 금액: <span>500원</span></p>
      </section>
      <section>
        <h2>자판기 보유한 동전</h2>
        <table>
          <thead>
            <tr>
              <th>동전</th>
              <th>개수</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </section>
    `;
  }
}

customElements.define('change-charge', ChangeCharge);
