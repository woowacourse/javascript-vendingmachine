import SUCCESS_MESSAGE from '../../constants/successMessage';
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
      this.subtractConsumerChargeMoney
    );
    on(
      $<HTMLButtonElement>('.return-coin-quantity-section__return-button'),
      '@initConsumerTotalChargeMoney',
      this.initConsumerTotalChargeMoney
    );
  }

  initConsumerTotalChargeMoney = () => {
    this.$consumerTotalChargeMoney.textContent = '0';
  };

  subtractConsumerChargeMoney = ({ detail: { subtractPrice } }) => {
    this.vendingMachineConsumerMoneyManager.subtractConsumerChargeMoney(
      subtractPrice
    );

    this.$consumerTotalChargeMoney.textContent = String(
      Number(this.$consumerTotalChargeMoney.textContent) - subtractPrice
    );
  };

  onClickConsumerChargeMoneyButton = (event: SubmitEvent) => {
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

      const consumerTotalChargeMoney =
        this.vendingMachineConsumerMoneyManager.getConsumerChargeMoney();

      renderSnackBar(
        this.$snackBarContainer,
        SUCCESS_MESSAGE.CONSUMER_CHARGED_MONEY(
          consumerChargeMoney,
          consumerTotalChargeMoney
        ),
        'success'
      );
    } catch ({ message }) {
      renderSnackBar(this.$snackBarContainer, message, 'error');
    }
  };
}
