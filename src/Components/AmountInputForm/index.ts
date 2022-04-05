import { $, convertStringToElement } from 'Utils';
import { validateHoldingAmountToAdd } from 'Utils/VendingMachine/validator';
import HoldingAmountStore from 'Store/HoldingAmountStore';
import Component from 'Components/Abstract';

import template from './template.html';
import './styles.scss';

export default class AmountInputForm extends Component {
  subscriberStore = [HoldingAmountStore];

  $addForm;

  constructor(props) {
    super(props);

    this.renderMethodList = {
      coins: [this.drawTotalHoldingAmount],
    };
  }

  template() {
    return convertStringToElement(template);
  }

  setDom() {
    this.$addForm = $('#add-holding-amount-form', this.$component);
  }

  setEvents() {
    this.$addForm.addEventListener('submit', this.onSubmitAddHoldingAmountForm);
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
