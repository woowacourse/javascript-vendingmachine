import { $ } from '../../utils/dom';
import { viewPainter } from '../../..';
import { validateProductInfo } from '../../utils/validator';

export default class ProductAdditionUI {
  constructor(productDomain) {
    this.$form = $('.product-addition__form');
    this.productDomain = productDomain;
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

      try {
        const products = this.productDomain.products;
        validateProductInfo(products, product);
      } catch ({ message }) {
        alert(message);
        return;
      }

      this.productDomain.addProduct(product);
      // viewPainter.renderProducts();
    });
  }
}
