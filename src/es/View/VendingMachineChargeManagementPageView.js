import { template } from './template';
import { $, showSnackBar } from '../utils';
import { validateHoldingAmountToAdd } from '../validator';
import VendingMachineChargeManagementPageManager from '../manager/VendingMachineChargeManagementPageManager';

class VendingMachineChargeManagementPageView {
  renderMethodList;

  $vendingMachineChargeForm;
  $vendingMachineChargeCoinTable;

  constructor() {
    VendingMachineChargeManagementPageManager.addSubscriber(this.render);
    this.setRenderMethodList();
  }

  loadPage = () => {
    $('main').innerHTML = template.vendingMachineChargeManagementPage;

    this.setDom();
    this.render({
      state: VendingMachineChargeManagementPageManager.getState(),
      changeStates: Object.keys(this.renderMethodList),
    });
    this.setEvents();
  };

  setDom() {
    this.$vendingMachineChargeForm = $('#vendingmachine-charge-form');
    this.$vendingMachineChargeCoinTable = $('#holding-amount-table');

    this.$vendingMachineChargeTable = $('#vendingmachine-charge-table');
    this.$totalVendingMachineCharge = $('#total-vendingmachine-charge');
  }

  setRenderMethodList() {
    this.renderMethodList = {
      coins: [this.updateTotalVendingMachineCharge, this.updateVendingMachineChargeCoinTable],
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
    const $vendingMachineChargeInput = $('input', event.target);
    const totalAmount = VendingMachineChargeManagementPageManager.getTotalAmount();

    try {
      validateHoldingAmountToAdd(Number($vendingMachineChargeInput.value), totalAmount);
    } catch (error) {
      showSnackBar(error.message);
      return;
    }

    VendingMachineChargeManagementPageManager.addCharge($vendingMachineChargeInput.value);
    $vendingMachineChargeInput.value = '';
  }

  updateTotalVendingMachineCharge = () => {
    const totalAmount = VendingMachineChargeManagementPageManager.getTotalAmount();

    this.$totalVendingMachineCharge.innerText = `${totalAmount.toLocaleString()}원`;
  };

  updateVendingMachineChargeCoinTable = ({ coins }) => {
    $('tbody', this.$vendingMachineChargeTable).innerHTML = template.coinTableRows(coins);
  };
}

export default new VendingMachineChargeManagementPageView();
