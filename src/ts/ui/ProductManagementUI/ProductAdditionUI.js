import { $ } from '../../utils/dom';
import { viewPainter } from '../../../index';

export default class ProductAdditionUI {
  constructor(productManagementDomain) {
    this.$form = $('.product-addition__form');
    this.productManagementDomain = productManagementDomain;
    this.addSubmitEvent();
  }

  addSubmitEvent() {
    this.$form.addEventListener('submit', e => {
      e.preventDefault();
      const $$inputs = Array.from(e.target.elements).filter(
        element => element.tagName === 'INPUT',
      );

      const product = {
        name: $$inputs[0].value,
        price: $$inputs[1].value,
        quantity: $$inputs[2].value,
      };

      this.productManagementDomain.addProduct(product);
      viewPainter.renderProducts();
    });
  }
}
