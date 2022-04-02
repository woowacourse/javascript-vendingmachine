import CustomElement from '../../abstracts/CustomElement';

class PurchaseMoneyForm extends CustomElement {
  template() {
    return `
      <form class="purchase-money-form">
        <label class="purchase-money-label" for="purchase-money-input">상품을 구매할 금액을 투입해주세요.</label>
        <input type="number" id="purchase-money-input" placeholder="금액" required>
        <button class="purchase-money-button button">투입</button>
      </form>
    `;
  }
}

customElements.define('purchase-money-form', PurchaseMoneyForm);

export default PurchaseMoneyForm;
