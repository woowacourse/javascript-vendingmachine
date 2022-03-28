import { $ } from '../../utils/dom';
import { validateProductInfo } from './validator';
import { viewPainter } from '../ViewPainter';
import { ProductInfoUnionType } from '../../domain/types';

type Inputs = {
  [infoType in ProductInfoUnionType]: HTMLInputElement;
};

export default class ProductAdditionComponent {
  private productDomain;

  constructor(productDomain) {
    this.productDomain = productDomain;
    $('.product-addition__form').addEventListener('submit', this.submitHandler);
    $('.product-addition__input').focus();
  }

  private submitHandler = (e: Event) => {
    e.preventDefault();

    if (!(e.target instanceof HTMLFormElement)) return;

    const $$formElements = e.target.elements;
    const $$inputs = {
      name: $$formElements.namedItem('name') as HTMLInputElement,
      price: $$formElements.namedItem('price') as HTMLInputElement,
      quantity: $$formElements.namedItem('quantity') as HTMLInputElement,
    };

    const product = {
      name: $$inputs.name.value,
      price: $$inputs.price.valueAsNumber,
      quantity: $$inputs.quantity.valueAsNumber,
    };

    try {
      const { products } = this.productDomain;
      validateProductInfo(products, product);
    } catch ({ name, message }) {
      this.focusOnInvalidInput(name, $$inputs);
      alert(message);
      return;
    }

    this.productDomain.addProduct(product);
    viewPainter.renderProducts();
  };

  private focusOnInvalidInput(target: ProductInfoUnionType, $$inputs: Inputs) {
    switch (target) {
      case 'name':
        $$inputs.name.focus();
        break;
      case 'price':
        $$inputs.price.focus();
        break;
      case 'quantity':
        $$inputs.quantity.focus();
    }
  }
}
