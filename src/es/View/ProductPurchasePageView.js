import { $, clearInnerInputValues, getInnerInputValues } from '../utils';
import { template } from './template';
import ProductPurchasePageManager from '../manager/ProductPurchasePageManager';
import { validateCustomerChargeToAdd } from '../validator';
import { showSnackBar } from '../utils/index';
import { GUIDE_MESSAGE } from '../constants';

class ProductPurchasePageView {
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
    try {
      validateCustomerChargeToAdd(customerCharge);
    } catch (err) {
      showSnackBar(err.message);
      return;
    }
    ProductPurchasePageManager.addCustomerCharge(customerCharge);
    clearInnerInputValues(event.target);
    showSnackBar(GUIDE_MESSAGE.CUSTOMER_CHARGE_SUCCESS);
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
    let productName = '';
    try {
      productName = ProductPurchasePageManager.purchaseProductByIndex(productIndex);
    } catch (err) {
      showSnackBar(err.message);
      return;
    }
    showSnackBar(GUIDE_MESSAGE.PURCHASE_SUCCESS(productName));
  };

  onClickReturnChangeButton = () => {
    const coinsToBeReturned = ProductPurchasePageManager.returnChanges();
    this.updateChangeTable({ ReturnedCoins: coinsToBeReturned });
    if (ProductPurchasePageManager.getState().customerChargeAmount > 0) {
      showSnackBar(GUIDE_MESSAGE.RETURN_INSUFFICIENT_CHANGES);
      return;
    }
    showSnackBar(GUIDE_MESSAGE.RETURN_CHANGES_SUCCESS);
  };

  render = ({ state, changeStates }) => {
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

export default new ProductPurchasePageView();
