import { ProductInformationInput } from '../component/productInformationInput';

export class ProductManageView {
  productInformationInput;
  contentsContainer;

  constructor() {
    this.productInformationInput = new ProductInformationInput();
    this.contentsContainer = document.querySelector('#contents-container');
    this.productInformationInput.render(this.contentsContainer);
  }
}
