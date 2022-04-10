import ProductManagementDomain from '../../../domain/ProductManagementDomain/ProductManagement';
import { ProductInfoUnionType } from '../../../domain/types';
import { VENDING_MACHINE_MESSAGE } from '../../../constants/message';
import { $, getNamedItem } from '../../../utils/dom';
import { showSnackbar } from '../../../utils';
import { viewPainter } from '../../ViewPainter';

type Inputs = {
  [infoType in ProductInfoUnionType]: HTMLInputElement;
};

export default class ProductAdditionUI {
  private readonly productDomain: ProductManagementDomain;

  constructor(productDomain: ProductManagementDomain) {
    this.productDomain = productDomain;
    $('.product-addition__form').addEventListener('submit', this.submitHandler);
    $('.product-addition__input').focus();
  }

  private submitHandler = (e: SubmitEvent) => {
    e.preventDefault();

    if (!(e.target instanceof HTMLFormElement)) return;

    const $$formElements = e.target.elements;
    const $$inputs = {
      name: getNamedItem<HTMLInputElement>($$formElements, 'name'),
      price: getNamedItem<HTMLInputElement>($$formElements, 'price'),
      quantity: getNamedItem<HTMLInputElement>($$formElements, 'quantity'),
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
    showSnackbar(VENDING_MACHINE_MESSAGE.SUCCESS_ADD_PRODUCT);
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
