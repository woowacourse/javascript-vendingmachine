import { HASH } from '../constant/path';
import { SELECTOR } from '../constant/selector';
import { generateCoinRechargeTabContentTemplate } from '../template/adminPageTemplate';
import { selectDom, selectDoms, showSnackbar } from '../utils';
import AdminPage from './AdminPage';

class CoinRechargeTab extends AdminPage {
  constructor(vendingMachine) {
    super(vendingMachine);

    this.coinRechargeTabButton = null;
    this.cashChargeForm = null;
    this.cashChargeInput = null;
    this.chargedAmountText = null;
    this.coinCountList = null;
  }

  renderInitialState(isLoginUser) {
    if (!isLoginUser) {
      location.hash = HASH.LOGIN_USER;
      return;
    }

    this.renderNavBar();
    this.coinRechargeTabButton = selectDom(SELECTOR.COIN_RECHARGE_TAB_BUTTON);

    const totalCoinAmount = this.vendingMachine.calculateTotalCoinAmount();
    this.changeTabContent(
      generateCoinRechargeTabContentTemplate(totalCoinAmount, this.vendingMachine.coinCollection),
      this.coinRechargeTabButton
    );

    this.cashChargeForm = selectDom(SELECTOR.CASH_CHARGE_FORM, this.tabContent);
    this.cashChargeInput = selectDom(SELECTOR.CASH_CHARGE_INPUT, this.cashChargeForm);
    this.chargedAmountText = selectDom(SELECTOR.CHARGED_AMOUNT, this.tabContent);
    this.coinCountList = selectDoms(SELECTOR.COIN_COUNT, this.tabContent);

    this.cashChargeForm.addEventListener('submit', this.#onSubmitCashChargeForm);

    this.cashChargeInput.focus();
  }

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
