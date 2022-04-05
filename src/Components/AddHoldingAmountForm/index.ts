import { $ } from 'Utils';
import { validateHoldingAmountToAdd } from 'Utils/VendingMachine/validator';
import HoldingAmountStore from 'Store/HoldingAmountStore';
import Component from 'Components/Abstract';
import AmountInputForm from 'Components/@Shared/AmountInputForm';

export default class AddHoldingAmountForm extends Component {
  $addForm;
  subscriberStore = [HoldingAmountStore];

  constructor(props) {
    super(props);

    this.renderMethodList = {
      coins: [this.drawTotalHoldingAmount],
    };
  }

  template() {
    return this.createChildComponent<IAmountInputProps>(AmountInputForm, {
      totalAmountText: '현재 보유 금액',
      onSubmit: this.onSubmitAddHoldingAmountForm,
    });
  }

  setDom() {
    this.$addForm = $('#add-holding-amount-form', this.$component);
  }

  onSubmitAddHoldingAmountForm(event) {
    event.preventDefault();
    const $input = $('input[name="add-holding-amount"]', event.target);
    const totalAmount = HoldingAmountStore.getTotalAmount();

    try {
      validateHoldingAmountToAdd(Number($input.value), totalAmount);
    } catch (error) {
      alert(error.message);
      return;
    }

    HoldingAmountStore.addAmount($input.value);
    $input.value = '';
  }

  drawTotalHoldingAmount = () => {
    const totalAmount = HoldingAmountStore.getTotalAmount();
    $('#total-holding-amount', this.$component).innerText = `${totalAmount.toLocaleString()}원`;
  };
}
