import { $, $$, convertStringToElement } from 'Utils';
import ProductStore from 'Store/ProductStore';
import { validateProduct } from 'Utils/VendingMachine/validator';
import Component from 'Components/Abstract';

import template from './template.html';
import './styles.scss';

export default class AddProduct extends Component {
  $addForm;

  template() {
    return convertStringToElement(template);
  }

  setDom() {
    this.$addForm = $('#add-product-form', this.$component);
  }

  setEvents() {
    this.$addForm.addEventListener('submit', this.onSubmitAddProductForm);
  }

  onSubmitAddProductForm(event) {
    event.preventDefault();
    const $$inputs = $$('input', event.target);
    const product = Array.from($$inputs).reduce((previous, inputElement) => {
      previous[inputElement.name] =
        inputElement.type === 'number' ? Number(inputElement.value) : inputElement.value;
      return previous;
    }, {});

    try {
      validateProduct(product);
    } catch (error) {
      alert(error.message);
      return;
    }

    const productIndex = ProductStore.findProductIndexByName(product.name);

    if (productIndex === -1) {
      ProductStore.addProduct(product);
      $$inputs.forEach($input => ($input.value = ''));
      return;
    }

    if (confirm('이미 존재하는 상품입니다.\n기존 상품 목록에서 덮어씌우시겠습니까?')) {
      ProductStore.updateProduct(productIndex, product);
    }
  }
}
