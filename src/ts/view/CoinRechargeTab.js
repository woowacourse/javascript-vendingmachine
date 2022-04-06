import { generateCoinRechargeTabContentTemplate } from '../template';
import { selectDom, selectDoms, showSnackbar } from '../utils';
import VendingMachineTab from './VendingMachineTab';

class CoinRechargeTab extends VendingMachineTab {
  constructor(vendingMachine) {
    super(vendingMachine);

    this.coinRechargeTabButton = null;
    this.cashChargeForm = null;
    this.cashChargeInput = null;
    this.chargedAmountText = null;
    this.coinCountList = null;
  }

  renderInitialCoinRechargeTabState() {
    this.renderNavBar();
    this.coinRechargeTabButton = selectDom('#coin-recharge-tab-button');

    const totalCoinAmount = this.vendingMachine.calculateTotalCoinAmount();

    this.changeTabContent(
      generateCoinRechargeTabContentTemplate(totalCoinAmount, this.vendingMachine.coinCollection),
      this.coinRechargeTabButton
    );

    this.cashChargeForm = selectDom('#cash-charge-form', this.tabContent);
    this.cashChargeInput = selectDom('.cash-charge-input', this.cashChargeForm);
    this.chargedAmountText = selectDom('#charged-amount', this.tabContent);
    this.coinCountList = selectDoms('.coin-count', this.tabContent);

    this.coinRechargeTabButton.addEventListener('click', this.#onClickCoinRechargeTabButton);
    this.cashChargeForm.addEventListener('submit', this.#onSubmitCashChargeForm);

    this.cashChargeInput.focus();
  }

  #onClickCoinRechargeTabButton = () => {
    if (this.coinRechargeTabButton.classList.contains('selected')) {
      return;
    }
    this.renderInitialCoinRechargeTabState();
  };

  #onSubmitCashChargeForm = (e) => {
    e.preventDefault();

    const chargedCash = this.cashChargeInput.valueAsNumber;

    try {
      this.vendingMachine.validateCashInput(chargedCash);
    } catch (error) {
      showSnackbar(this.snackbar, error.message);
      return;
    }

    this.#renderChargedCoinState(
      this.vendingMachine.chargeCoin(chargedCash),
      this.vendingMachine.coinCollection
    );
  };

  #renderChargedCoinState(totalCoinAmount, currentCoinCollection) {
    this.chargedAmountText.textContent = totalCoinAmount;
    this.coinCountList.forEach((coinCount) => {
      coinCount.textContent = `${currentCoinCollection[coinCount.dataset.coinValue]}개`;
    });
  }
}

export default CoinRechargeTab;
