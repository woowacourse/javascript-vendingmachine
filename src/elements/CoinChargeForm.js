import CustomElement from '../abstracts/CustomElement';

class CoinChargeForm extends CustomElement {
  template() {
    return `
      <form class="coin-charge-form">
        <label for="coin-input">자판기가 보유할 금액을 입력해주세요.</label>
        <input type="number" id="coin-input" placeholder="금액">
        <button class="coin-charge-button">충전</button>
      </form>
      <p>현재 보유 금액: <span></span></p>
    `;
  }
}

customElements.define('coin-charge-form', CoinChargeForm);

export default CoinChargeForm;
