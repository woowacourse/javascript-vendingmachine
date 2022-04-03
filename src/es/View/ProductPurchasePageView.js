import { $, getInnerInputValues } from '../utils';
import { template } from './template';
import ProductPurchasePageManager from '../Manager/ProductPurchasePageManager';

export default class ProductPurchasePageView {
  renderMethodList;

  $customerChargeForm;
  $productTableSection;
  $productTable;

  constructor() {
    ProductPurchasePageManager.addSubscriber(this.render);
    this.setRenderMethodList();
  }

  loadPage = () => {
    $('main').innerHTML = template.productPurchasePage;

    this.setDom();
    this.render({
      state: { ...ProductPurchasePageManager.getState() },
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
      vendingMachineChargeCoins: [],
      customerChargeAmount: [this.updateTotalCustomerCharge],
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
    ProductPurchasePageManager.addCustomerCharge(customerCharge);
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
    try {
      ProductPurchasePageManager.purchaseProductByIndex(productIndex);
    } catch (err) {
      alert(err.message);
    }
  };

  onClickReturnChangeButton = () => {
    const coinsToBeReturned = ProductPurchasePageManager.returnChanges();
    this.updateChangeTable({ ReturnedCoins: coinsToBeReturned });
  };

  render = ({ state, changeStates }) => {
    console.log(changeStates);
    const renderMethods = changeStates.reduce((previous, stateKey) => {
      this.renderMethodList[stateKey].forEach(renderMethod => previous.add(renderMethod));
      return previous;
    }, new Set());
    renderMethods.forEach(renderMethod => renderMethod(state));
  };

  updateTotalCustomerCharge = ({ customerChargeAmount }) => {
    $('#total-customer-charge').innerText = `${customerChargeAmount}원`;
  };

  updateProductList = ({ products }) => {
    const productItem = template.productPurchaseTableRows(products);
    $('tbody', this.$productTable).innerHTML = productItem;
  };

  updateChangeTable = ({ ReturnedCoins }) => {
    $('tbody', this.$changeTable).innerHTML = template.coinTableRows(ReturnedCoins);
  };
}
