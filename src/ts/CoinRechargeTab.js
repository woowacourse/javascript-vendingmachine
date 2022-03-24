import { coinRechargeTabContentTemplate } from './template';
import { selectDom } from './utils';

class CoinRechargeTab {
  constructor(vendingMachine) {
    this.vendingMachine = vendingMachine;

    this.navTabButtonList = document.querySelectorAll('.nav-tab-button');
    this.coinRechargeTabButton = selectDom('#coin-recharge-tab-button');
    this.tabContent = selectDom('#tab-content');

    this.cashChargeForm = null;
    this.cashChargeInput = null;

    this.coinRechargeTabButton.addEventListener('click', this.#onClickCoinRechargeTabButton);
  }

  #onClickCoinRechargeTabButton = ({ target: targetTabButton }) => {
    if (this.coinRechargeTabButton.classList.contains('selected')) {
      return;
    }

    this.#changeTabContent(coinRechargeTabContentTemplate, targetTabButton);

    this.cashChargeForm = selectDom('#cash-charge-form', this.tabContent);
    this.cashChargeInput = selectDom('.cash-charge-input', this.cashChargeForm);

    this.cashChargeForm.addEventListener('submit', this.#onSubmitCashChargeForm);
  };

  #changeTabContent(contentTemplate, targetTabButton) {
    this.tabContent.replaceChildren();
    this.tabContent.insertAdjacentHTML('afterbegin', contentTemplate);

    this.navTabButtonList.forEach((navTabButton) =>
      navTabButton.classList.toggle('selected', targetTabButton === navTabButton)
    );
  }

  #onSubmitCashChargeForm = (e) => {
    e.preventDefault();

    const chargedCash = this.cashChargeInput.value;
    try {
      this.vendingMachine.validateCashInput(Number(chargedCash));
    } catch (error) {
      return alert(error.message);
    }
  };
}

export default CoinRechargeTab;
