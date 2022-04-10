import { PurchaseMoney } from '../../domain/PurchaseMoney';

interface PurchaseMoneyInputFormInterface {
  render();
}

export class PurchaseMoneyInputForm implements PurchaseMoneyInputFormInterface {
  #target: HTMLDivElement;
  #purchaseMoney: PurchaseMoney;
  #purchaseMoneySubmitBtn: HTMLButtonElement;
  #purchaseMoneySpan: HTMLSpanElement;
  #purchaseMoneyInputForm: HTMLFormElement;

  constructor({ target, purchaseMoney }) {
    this.#target = target;
    this.#purchaseMoney = purchaseMoney;

    this.#target.addEventListener('productPurchased', this.#updatePurchaseMoney);
    this.#target.addEventListener('coinsReturned', this.#updatePurchaseMoney);
  }

  #template(purchaseMoney) {
    return `
      <div>
        <form id="purchase-money-input-form">
          <label id="purchase-money-input-label" for="purchase-money-input">상품을 구매할 금액을 투입해주세요</label>
          <input id="purchase-money-input" class="input" type="number" placeholder="금액" step="10" min="10" max="10000" />
          <button id="purchase-money-submit-btn" class="submit-button button" type="submit">투입</button>
        </form>
        <div id="purchase-money-container">현재보유금액 : <span id="purchase-money">${purchaseMoney}</span>원</div>
      </div>
    `;
  }

  render() {
    this.#target.insertAdjacentHTML('beforeend', this.#template(this.#purchaseMoney.getMoney()));

    this.#selectDOM();
    this.#bindEvent();
  }

  #selectDOM() {
    this.#purchaseMoneyInputForm = document.querySelector('#purchase-money-input-form');
    this.#purchaseMoneySubmitBtn = document.querySelector('#purchase-money-submit-btn');
    this.#purchaseMoneySpan = document.querySelector('#purchase-money');
  }

  #bindEvent() {
    this.#purchaseMoneySubmitBtn.addEventListener('click', this.#handleSetPurchaseMoney);
  }

  #handleSetPurchaseMoney = (e: Event) => {
    e.preventDefault();

    const purchaseMoney = (document.querySelector('#purchase-money-input') as HTMLInputElement)
      .valueAsNumber;

    try {
      this.#purchaseMoney.addMoney(purchaseMoney);
      this.#updatePurchaseMoney();

      this.#target.dispatchEvent(
        new CustomEvent('showSnackbar', {
          detail: { type: 'success', message: `${purchaseMoney}원을 투입하였습니다` },
        })
      );
    } catch (err) {
      this.#target.dispatchEvent(
        new CustomEvent('showSnackbar', {
          detail: { type: 'fail', message: err.message },
        })
      );
    } finally {
      this.#purchaseMoneyInputForm.reset();
    }
  };

  #updatePurchaseMoney = () => {
    this.#purchaseMoneySpan.textContent = String(this.#purchaseMoney.getMoney());
  };
}
