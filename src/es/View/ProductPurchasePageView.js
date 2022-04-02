import ProductStore from '../Store/ProductStore';
import { $ } from '../utils';
import { template } from './template';

export default class ProductPurchasePageView {
  renderMethodList;

  $addFormSection;
  $addForm;
  $tableSection;
  $table;

  constructor() {
    ProductStore.addSubscriber(this.render);
    this.setRenderMethodList();
  }

  loadPage = () => {
    $('main').innerHTML = template.productPurchasePage;

    this.setDom();
    this.render({
      state: ProductStore.getState(),
      changeStates: Object.keys(this.renderMethodList),
    });
    this.setEvents();
  };

  setDom() {
    this.$tableSection = $('#product-table-section');
    this.$table = $('#product-table', this.$tableSection);
  }

  setRenderMethodList() {
    this.renderMethodList = {
      products: [this.drawProductList],
    };
  }

  setEvents() {
    this.$table.addEventListener('click', this.onClickTableInnerButton);
  }

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
    const renderMethods = changeStates.reduce((previous, stateKey) => {
      this.renderMethodList[stateKey].forEach(renderMethod => previous.add(renderMethod));
      return previous;
    }, new Set());
    renderMethods.forEach(renderMethod => renderMethod(state));
  };

  drawProductList = ({ products }) => {
    const productItem = template.productPurchaseTableRows(products);
    $('tbody', this.$table).innerHTML = productItem;
  };
}
