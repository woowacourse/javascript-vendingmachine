import { $ } from '../../utils/dom';
import { viewPainter } from '../../../index';
import { validateProductInfo } from '../../utils/validator';

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
        price: $$inputs[1].valueAsNumber,
        quantity: $$inputs[2].valueAsNumber,
      };

      console.log('product', product);

      try {
        const products = this.productManagementDomain.products;
        validateProductInfo(products, product);
      } catch ({ message }) {
        alert(message);
        return;
      }

      this.productManagementDomain.addProduct(product);
      viewPainter.renderProducts();
    });
  }
}
