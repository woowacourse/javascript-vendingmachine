import { $, on } from '../../dom/domHelper';

export default class ConsumerChargeMoneyInputComponent {
  private $consumerChargeMoneyInput = $<HTMLInputElement>(
    '.purchase-form-section__consumer-charge-money-input'
  );
  private $consumerCHargeMoneyForm = $<HTMLFormElement>(
    '.consumer-charge-money-form-section__form'
  );
  private $consumerTotalChargeMoney = $<HTMLSpanElement>(
    '.consumer-charge-money-form-section__total-consumer-charge-money'
  );

  constructor(private vendingMachineConsumerMoneyManager) {
    on(
      this.$consumerCHargeMoneyForm,
      'submit',
      this.onSubmitConsumerChargeMoneyButton
    );

    on(
      $<HTMLElement>('.consumer-product-table__tbody'),
      '@subtractConsumerChargeMoney',
      this.subtractChargeMoney
    );
  }

  subtractChargeMoney = ({ detail: { subtractPrice } }) => {
    this.vendingMachineConsumerMoneyManager.subtractConsumerChargeMoney(
      subtractPrice
    );

    this.$consumerTotalChargeMoney.textContent = String(
      Number(this.$consumerTotalChargeMoney.textContent) - subtractPrice
    );
  };

  onSubmitConsumerChargeMoneyButton = (event: Event) => {
    event.preventDefault();

    const { valueAsNumber: consumerChargeMoney } =
      this.$consumerChargeMoneyInput;

    this.vendingMachineConsumerMoneyManager.addConsumerChargeMoney(
      consumerChargeMoney
    );

    this.$consumerTotalChargeMoney.textContent = String(consumerChargeMoney);
    this.$consumerChargeMoneyInput.value = '';
  };
}
