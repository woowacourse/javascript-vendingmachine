import { template } from './template';
import { $ } from '../utils';
import { validateHoldingAmountToAdd } from '../validation';
import VendingMachineChargeStore from '../Store/VendingMachineChargeStore';

export default class VendingMachineChargeManagementPageView {
  renderMethodList;

  $vendingMachineChargeForm;
  $vendingMachineChargeCoinTable;

  constructor() {
    VendingMachineChargeStore.addSubscriber(this.render);
    this.setRenderMethodList();
  }

  loadPage = () => {
    $('main').innerHTML = template.vendingMachineChargeManagementPage;

    this.setDom();
    this.render({
      state: VendingMachineChargeStore.getState(),
      changeStates: Object.keys(this.renderMethodList),
    });
    this.setEvents();
  };

  setDom() {
    this.$vendingMachineChargeForm = $('#vendingmachine-charge-form');
    this.$vendingMachineChargeCoinTable = $('#holding-amount-table');
  }

  setRenderMethodList() {
    this.renderMethodList = {
      coins: [this.drawTotalHoldingAmount, this.drawHoldingAmountList],
    };
  }

  setEvents() {
    this.$vendingMachineChargeForm.addEventListener('submit', this.onSubmitVendingMachineChargeForm);
  }

  render = ({ state, changeStates }) => {
    const renderMethods = changeStates.reduce((previous, stateKey) => {
      this.renderMethodList[stateKey].forEach(renderMethod => previous.add(renderMethod));
      return previous;
    }, new Set());
    renderMethods.forEach(renderMethod => renderMethod(state));
  };

  onSubmitVendingMachineChargeForm(event) {
    event.preventDefault();
    const $input = $('input[name="add-holding-amount"]', event.target);
    const totalAmount = VendingMachineChargeStore.getTotalAmount();

    try {
      validateHoldingAmountToAdd(Number($input.value), totalAmount);
    } catch (error) {
      alert(error.message);
      return;
    }

    VendingMachineChargeStore.addAmount($input.value);
    $input.value = '';
  }

  drawTotalHoldingAmount = () => {
    const totalAmount = VendingMachineChargeStore.getTotalAmount();

    $('#total-vendingmachine-charge').innerText = `${totalAmount.toLocaleString()}원`;
  };

  drawHoldingAmountList = ({ coins }) => {
    $('tbody', this.$table).innerHTML = template.holdingAmountTableRows(coins);
  };
}
