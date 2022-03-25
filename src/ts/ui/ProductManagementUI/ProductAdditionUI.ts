import { $ } from '../../utils/dom';
import { validateProductInfo } from './validator';
import { viewPainter } from '../ViewPainter';

export default class ProductAdditionUI {
  private productDomain;

  constructor(productDomain) {
    this.productDomain = productDomain;
    this.addSubmitEvent();
  }

  addSubmitEvent() {
    $('.product-addition__form').addEventListener('submit', this.submitHandler);
  }

  submitHandler = (e: Event) => {
    e.preventDefault();

    if (!(e.target instanceof HTMLFormElement)) return;

    const $$inputs = Array.from(e.target.elements).filter(
      element => element.tagName === 'INPUT',
    ) as HTMLInputElement[];

    const product = {
      name: $$inputs[0].value,
      price: $$inputs[1].valueAsNumber,
      quantity: $$inputs[2].valueAsNumber,
    };

    try {
      const { products } = this.productDomain;
      validateProductInfo(products, product);
    } catch ({ message }) {
      alert(message);
      return;
    }

    this.productDomain.addProduct(product);
    viewPainter.renderProducts();
  };
}
