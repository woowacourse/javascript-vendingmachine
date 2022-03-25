import { generateCoinRechargeTabContentTemplate } from './template';
import { selectDom, selectDoms } from './utils';

class CoinRechargeTab {
  constructor(vendingMachine) {
    this.vendingMachine = vendingMachine;

    this.navTabButtonList = selectDoms('.nav-tab-button');
    this.coinRechargeTabButton = selectDom('#coin-recharge-tab-button');
    this.tabContent = selectDom('#tab-content');

    this.cashChargeForm = null;
    this.cashChargeInput = null;
    this.chargedAmountText = null;
    this.coinCountList = null;

    this.coinRechargeTabButton.addEventListener('click', this.#onClickCoinRechargeTabButton);
  }

  render() {
    const totalCoinAmount = this.vendingMachine.calculateTotalCoinAmount();

    this.#changeTabContent(
      generateCoinRechargeTabContentTemplate(totalCoinAmount, this.vendingMachine.coinCollection),
      this.coinRechargeTabButton
    );

    this.cashChargeForm = selectDom('#cash-charge-form', this.tabContent);
    this.cashChargeInput = selectDom('.cash-charge-input', this.cashChargeForm);
    this.chargedAmountText = selectDom('#charged-amount', this.tabContent);
    this.coinCountList = selectDoms('.coin-count', this.tabContent);

    this.cashChargeForm.addEventListener('submit', this.#onSubmitCashChargeForm);
  }

  #onClickCoinRechargeTabButton = ({ target: targetTabButton }) => {
    if (this.coinRechargeTabButton.classList.contains('selected')) {
      return;
    }

    const path = targetTabButton.dataset.hash;
    history.pushState({ path }, null, path);

    this.render();
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

    const chargedCash = this.cashChargeInput.valueAsNumber;

    try {
      this.vendingMachine.validateCashInput(chargedCash);
    } catch (error) {
      return alert(error.message);
    }

    this.vendingMachine.chargeCoin(chargedCash);
    this.chargedAmountText.textContent = this.vendingMachine.calculateTotalCoinAmount();

    const currentCoinColelction = this.vendingMachine.coinCollection;
    this.coinCountList.forEach((coinCount) => {
      coinCount.textContent = `${currentCoinColelction[coinCount.dataset.coinValue]}개`;
    });
  };
}

export default CoinRechargeTab;
