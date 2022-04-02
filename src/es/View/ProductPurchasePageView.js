import ProductStore from '../Store/ProductStore';
import VendingMachineChargeStore from '../Store/VendingMachineChargeStore';
import CustomerChargeStore from '../Store/CustomerChargeStore';
import { $, getInnerInputValues } from '../utils';
import { template } from './template';
import { COIN_TYPE } from '../constants';

export default class ProductPurchasePageView {
  renderMethodList;

  $customerChargeForm;
  $productTableSection;
  $productTable;

  constructor() {
    ProductStore.addSubscriber(this.render);
    CustomerChargeStore.addSubscriber(this.render);
    this.setRenderMethodList();
  }

  loadPage = () => {
    $('main').innerHTML = template.productPurchasePage;

    this.setDom();
    this.render({
      state: { ...ProductStore.getState(), ...CustomerChargeStore.getState() },
      changeStates: Object.keys(this.renderMethodList),
    });
    this.setEvents();
  };

  setDom() {
    this.$customerChargeForm = $('#customer-charge-form');
    this.$productTableSection = $('#product-table-section');
    this.$productTable = $('#product-table', this.$productTableSection);

    this.$changeTableSection = $('#change-table-section');
    this.$changeTable = $('#change-table', this.$changeTableSection);
    this.$returnChangeButton = $('#return-change-button', this.$changeTableSection);
  }

  setRenderMethodList() {
    this.renderMethodList = {
      products: [this.updateProductList],
      customerCharge: [this.updateTotalCustomerCharge],
    };
  }

  setEvents() {
    this.$customerChargeForm.addEventListener('submit', this.onSubmitCustomerChargeForm);
    this.$productTable.addEventListener('click', this.onClickTableInnerButton);
    this.$returnChangeButton.addEventListener('click', this.onClickReturnChangeButton);
  }

  onSubmitCustomerChargeForm = (event) => {
    event.preventDefault();
    const { customerCharge } = getInnerInputValues(event.target);
    CustomerChargeStore.addCharge(customerCharge);
    $('input', event.target).value = '';
  };

  onClickTableInnerButton = (event) => {
    if (event.target.type !== 'button') return;
    if (event.target.name === 'product-purchase') {
      this.onClickPurchaseButton(event);
    }
  };

  onClickPurchaseButton = (event) => {
    const $tableRow = event.target.closest('tr');
    if (!$tableRow) return;

    const productIndex = $tableRow.dataset.primaryKey;
    const { price } = ProductStore.getState().products[productIndex];

    if (price > CustomerChargeStore.getState().customerCharge) {
      alert('Too expensive, put more money! 😥');
      return;
    }

    CustomerChargeStore.subtractCharge(price);
    ProductStore.takeOutProductByIndex(productIndex);
  };

  onClickReturnChangeButton = (event) => {
    const { coins: vendingMachineCoins } = VendingMachineChargeStore.getState();
    const { customerCharge } = CustomerChargeStore.getState();
    if (VendingMachineChargeStore.getTotalAmount() <= customerCharge) {
      CustomerChargeStore.subtractCharge(customerCharge);
      VendingMachineChargeStore.subtractCoins(vendingMachineCoins);
      this.updateChangeTable({ ReturnedCoins: vendingMachineCoins });
      return;
    }

    const coinsToBeReturned = [0, 0, 0, 0];
    let leftCharge = customerCharge;
    COIN_TYPE.forEach((coin, index) => {
      const maxQuantity = Math.floor(leftCharge / coin);
      const returnQuantity = maxQuantity > vendingMachineCoins[index] ? vendingMachineCoins[index] : maxQuantity;
      coinsToBeReturned[index] = returnQuantity;
      leftCharge -= returnQuantity * coin;
    });

    CustomerChargeStore.subtractCharge(customerCharge - leftCharge);
    VendingMachineChargeStore.subtractCoins(coinsToBeReturned);
    this.updateChangeTable({ ReturnedCoins: coinsToBeReturned });
  };

  render = ({ state, changeStates }) => {
    const renderMethods = changeStates.reduce((previous, stateKey) => {
      this.renderMethodList[stateKey].forEach(renderMethod => previous.add(renderMethod));
      return previous;
    }, new Set());
    renderMethods.forEach(renderMethod => renderMethod(state));
  };

  updateTotalCustomerCharge = ({ customerCharge }) => {
    $('#total-customer-charge').innerText = `${customerCharge}원`;
  };

  updateProductList = ({ products }) => {
    const productItem = template.productPurchaseTableRows(products);
    $('tbody', this.$productTable).innerHTML = productItem;
  };

  updateChangeTable = ({ ReturnedCoins }) => {
    $('tbody', this.$changeTable).innerHTML = template.coinTableRows(ReturnedCoins);
  };
}
