interface PurchaseMoneyInputFormInterface {
  render();
}

export class PurchaseMoneyInputForm implements PurchaseMoneyInputFormInterface {
  #target: HTMLDivElement;

  constructor(target) {
    this.#target = target;
  }

  #template(purhcaseMoney) {
    return `
      <div>
        <form id="purchase-money-input-form">
          <label id="purchase-money-input-label" for="purchase-money-input">상품을 구매할 금액을 투입해주세요</label>
          <input id="purchase-money-input" class="input" type="number" placeholder="금액" step="10" min="10" max="10000" />
          <button id="purchase-money-submit-btn" class="submit-button button" type="submit">투입</button>
        </form>
        <div id="purchase-money-container">현재보유금액 : <span id="purchase-money">${purhcaseMoney}</span>원</div>
      </div>
    `;
  }

  render() {
    this.#target.insertAdjacentHTML('beforeend', this.#template());
  }
}
