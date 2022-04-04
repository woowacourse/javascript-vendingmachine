import { $ } from '../../../utils/dom';
import { viewPainter } from '../../ViewPainter';
import { ProductInfoUnionType } from '../../../domain/types';
import { showSnackbar } from '../../../utils';
import { MESSAGE } from '../../../constants';

type Inputs = {
  [infoType in ProductInfoUnionType]: HTMLInputElement;
};

export default class ProductAdditionUI {
  private productDomain;

  constructor(productDomain) {
    this.productDomain = productDomain;
    $('.product-addition__form').addEventListener('submit', this.submitHandler);
    $('.product-addition__input').focus();
  }

  private submitHandler = (e: SubmitEvent) => {
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
      this.productDomain.validateProductInput(product);
    } catch ({ name, message }) {
      this.focusOnInvalidInput(name, $$inputs);
      showSnackbar(message);
      return;
    }

    this.productDomain.addProduct(product);
    viewPainter.renderProducts();
    showSnackbar(MESSAGE.SUCCESS_ADD_PRODUCT);
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
