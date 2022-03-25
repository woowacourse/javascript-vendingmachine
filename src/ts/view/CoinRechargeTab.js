import { generateCoinRechargeTabContentTemplate } from '../template';
import { selectDom, selectDoms } from '../utils';
import VendingMachineTab from './VendingMachineTab';

class CoinRechargeTab extends VendingMachineTab {
  constructor(vendingMachine) {
    super(vendingMachine);

    this.coinRechargeTabButton = selectDom('#coin-recharge-tab-button');
    this.cashChargeForm = null;
    this.cashChargeInput = null;
    this.chargedAmountText = null;
    this.coinCountList = null;

    this.coinRechargeTabButton.addEventListener('click', this.#onClickCoinRechargeTabButton);
  }

  renderInitialTabState() {
    const totalCoinAmount = this.vendingMachine.calculateTotalCoinAmount();

    this.changeTabContent(
      generateCoinRechargeTabContentTemplate(totalCoinAmount, this.vendingMachine.coinCollection),
      this.coinRechargeTabButton
    );

    this.cashChargeForm = selectDom('#cash-charge-form', this.tabContent);
    this.cashChargeInput = selectDom('.cash-charge-input', this.cashChargeForm);
    this.chargedAmountText = selectDom('#charged-amount', this.tabContent);
    this.coinCountList = selectDoms('.coin-count', this.tabContent);

    this.cashChargeForm.addEventListener('submit', this.#onSubmitCashChargeForm);
  }

  #onClickCoinRechargeTabButton = ({
    target: {
      dataset: { hash },
    },
  }) => {
    if (this.coinRechargeTabButton.classList.contains('selected')) {
      return;
    }
    this.changeHashUrl(hash);
    this.renderInitialTabState();
  };

  #onSubmitCashChargeForm = (e) => {
    e.preventDefault();

    const chargedCash = this.cashChargeInput.valueAsNumber;

    try {
      this.vendingMachine.validateCashInput(chargedCash);
    } catch (error) {
      return alert(error.message);
    }

    this.#renderChargedCoinState(
      this.vendingMachine.chargeCoin(chargedCash),
      this.vendingMachine.coinCollection
    );
  };

  #renderChargedCoinState(totalCoinAmount, currentCoinColelction) {
    this.chargedAmountText.textContent = totalCoinAmount;
    this.coinCountList.forEach((coinCount) => {
      coinCount.textContent = `${currentCoinColelction[coinCount.dataset.coinValue]}개`;
    });
  }
}

export default CoinRechargeTab;
