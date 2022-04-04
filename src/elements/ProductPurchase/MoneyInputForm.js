import CustomElement from '../../abstracts/CustomElement';

class MoneyInputForm extends CustomElement {
  template() {
    return `
      <form class="money-input-form">
        <label class="money-input-label" for="money-input">상품을 구매할 금액을 투입해주세요.</label>
        <input type="number" id="money-input" placeholder="금액" required>
        <button class="money-input-button">투입</button>
      </form>
      <p>투입한 금액: <span class="user-money">0</span>원</p>
    `;
  }
}

customElements.define('money-input-form', MoneyInputForm);

export default MoneyInputForm;
