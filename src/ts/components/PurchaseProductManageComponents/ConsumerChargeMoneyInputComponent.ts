import { $, on } from '../../dom/domHelper';
import renderSnackBar from '../../dom/snackBar';
import { checkValidConsumerChargeMoney } from '../../validation/checkConsumerChargeMoney';

export default class ConsumerChargeMoneyInputComponent {
  private $snackBarContainer = $<HTMLElement>('.snack-bar-container');
  private $consumerChargeMoneyInput = $<HTMLInputElement>(
    '.purchase-form-section__consumer-charge-money-input'
  );
  private $consumerChargeMoneyButton = $<HTMLButtonElement>(
    '.consumer-charge-money-form-section__button'
  );
  private $consumerTotalChargeMoney = $<HTMLSpanElement>(
    '.consumer-charge-money-form-section__total-consumer-charge-money'
  );

  constructor(private vendingMachineConsumerMoneyManager) {
    on(
      this.$consumerChargeMoneyButton,
      'click',
      this.onClickConsumerChargeMoneyButton
    );
    on(
      $<HTMLElement>('.consumer-product-table__tbody'),
      '@subtractConsumerChargeMoney',
      this.subtractChargeMoney
    );
    on(
      $<HTMLButtonElement>('.return-coin-quantity-section__return-button'),
      '@initTotalChargeMoney',
      this.initTotalConsumerChargeMoney
    );
  }

  initTotalConsumerChargeMoney = () => {
    this.$consumerTotalChargeMoney.textContent = '0';
  };

  subtractChargeMoney = ({ detail: { subtractPrice } }) => {
    this.vendingMachineConsumerMoneyManager.subtractConsumerChargeMoney(
      subtractPrice
    );

    this.$consumerTotalChargeMoney.textContent = String(
      Number(this.$consumerTotalChargeMoney.textContent) - subtractPrice
    );
  };

  onClickConsumerChargeMoneyButton = (event: Event) => {
    event.preventDefault();

    try {
      const { valueAsNumber: consumerChargeMoney } =
        this.$consumerChargeMoneyInput;

      checkValidConsumerChargeMoney(consumerChargeMoney);

      this.vendingMachineConsumerMoneyManager.addConsumerChargeMoney(
        consumerChargeMoney
      );

      this.$consumerTotalChargeMoney.textContent = String(
        consumerChargeMoney + Number(this.$consumerTotalChargeMoney.textContent)
      );
      this.$consumerChargeMoneyInput.value = '';
      renderSnackBar(
        this.$snackBarContainer,
        `${consumerChargeMoney}원이 투입 되었습니다. 현재 투입된 총 금액은 ${this.vendingMachineConsumerMoneyManager.getConsumerChargeMoney()}원 입니다.`,
        'success'
      );
    } catch ({ message }) {
      renderSnackBar(this.$snackBarContainer, message, 'error');
    }
  };
}
