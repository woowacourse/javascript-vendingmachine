import { $ } from '../../utils/dom';
import { validateProductInfo } from './validator';
import { viewPainter } from '../ViewPainter';
import { focusOnInvalidInput, showSnackbar } from '../../utils';
import type { ProductInfo } from '../../domain/types';
import type { Inputs } from '../../types';

export default class ProductAdditionComponent {
  private productManagement;

  constructor(productManagement) {
    this.productManagement = productManagement;
    $('.product-addition__form').addEventListener('submit', this.submitHandler);
    $('.product-addition__input').focus();
  }

  private submitHandler = (e: Event) => {
    e.preventDefault();

    if (!(e.target instanceof HTMLFormElement)) return;

    const $formElements = e.target.elements;
    const $inputs = {
      name: $formElements.namedItem('name') as HTMLInputElement,
      price: $formElements.namedItem('price') as HTMLInputElement,
      quantity: $formElements.namedItem('quantity') as HTMLInputElement,
    };

    const product = {
      name: $inputs.name.value,
      price: $inputs.price.valueAsNumber,
      quantity: $inputs.quantity.valueAsNumber,
    };

    try {
      const { products } = this.productManagement;
      validateProductInfo(products, product);
    } catch ({ name, message }) {
      focusOnInvalidInput<ProductInfo>(name, $inputs);
      showSnackbar(message);
      return;
    }

    this.productManagement.addProduct(product);
    viewPainter.renderProducts();
  };
}
