import { $ } from '../../dom';
import { on } from '../../events';

export default class PurchaseMoneyInputComponent {
  private $moneyInputForm = $('.money-for-purchase-form') as HTMLInputElement;
  private $moneyInput = $(
    '.money-for-purchase-form-section__money-input'
  ) as HTMLFormElement;

  constructor(private purchaseManager, private renderTotalMoney) {
    on(this.$moneyInputForm, 'submit', this.onSubmitMoneyForPurchase);
  }

  private onSubmitMoneyForPurchase = (e) => {
    e.preventDefault();

    this.purchaseManager.addMoney(this.$moneyInput.valueAsNumber);
    this.renderTotalMoney();
    this.$moneyInput.value = '';
  };
}
