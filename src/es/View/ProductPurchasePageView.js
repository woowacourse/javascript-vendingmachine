import ProductStore from '../Store/ProductStore';
import CustomerChargeStore from '../Store/CustomerChargeStore';
import { $, getInnerInputValues } from '../utils';
import { template } from './template';

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
    console.log('load');
    $('main').innerHTML = template.productPurchasePage;

    this.setDom();
    this.render({
      state: ProductStore.getState(),
      changeStates: Object.keys(this.renderMethodList),
    });
    this.setEvents();
  };

  setDom() {
    this.$customerChargeForm = $('#customer-charge-form');
    this.$productTableSection = $('#product-table-section');
    this.$productTable = $('#product-table', this.$productTableSection);
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
  }

  onSubmitCustomerChargeForm = (event) => {
    event.preventDefault();
    const { customerCharge } = getInnerInputValues(event.target);
    CustomerChargeStore.addCharge(customerCharge);
  };

  onClickTableInnerButton = (event) => {
    if (event.target.type !== 'button') return;
    if (event.target.name === 'product-purchase') {
      this.onClickPurchaseButton(event);
    }
  };

  onClickPurchaseButton(event) {
    const $tableRow = event.target.closest('tr');
    if (!$tableRow) return;
    const productIndex = $tableRow.dataset.primaryKey;
    ProductStore.takeOutProductByIndex(productIndex);
  }

  render = ({ state, changeStates }) => {
    console.log(changeStates);
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
}
