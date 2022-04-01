import VendingMachineTab from './VendingMachineTab';
import { generateCoinRechargeTabContentTemplate } from '../template';
import { selectDom, selectDoms } from '../utils';
import { ID, CLASS } from '../constant/selector';

class CoinRechargeTab extends VendingMachineTab {
  constructor(vendingMachine, tabHash) {
    super(vendingMachine, tabHash);

    this.coinRechargeTabButton = selectDom(`#${ID.COIN_RECHARGE_TAB_BUTTON}`);
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

    this.cashChargeForm = selectDom(`#${ID.CASH_CHARGE_FORM}`, this.tabContent);
    this.cashChargeInput = selectDom(`.${CLASS.CASH_CHARGE_INPUT}`, this.cashChargeForm);
    this.chargedAmountText = selectDom(`#${ID.CHARGED_AMOUNT}`, this.tabContent);
    this.coinCountList = selectDoms(`.${CLASS.COIN_COUNT}`, this.tabContent);

    this.cashChargeForm.addEventListener('submit', this.#onSubmitCashChargeForm);
  }

  #onClickCoinRechargeTabButton = ({
    target: {
      dataset: { hash },
    },
  }) => {
    if (this.coinRechargeTabButton.classList.contains(CLASS.SELECTED)) {
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

  #renderChargedCoinState(totalCoinAmount, currentCoinCollection) {
    this.chargedAmountText.textContent = totalCoinAmount;
    this.coinCountList.forEach((coinCount) => {
      coinCount.textContent = `${currentCoinCollection[coinCount.dataset.coinValue]}개`;
    });
  }
}

export default CoinRechargeTab;
