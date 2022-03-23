import { ProductInformationInput } from '../component/ProductInformationInput';
import { ProductCatalogTable } from '../component/ProductCatalogTable';

export class ProductManageView {
  productInformationInput: ProductInformationInput;
  productCatalogTable: ProductCatalogTable;
  contentsContainer: HTMLDivElement;

  constructor() {
    this.productInformationInput = new ProductInformationInput();
    this.productCatalogTable = new ProductCatalogTable();

    this.contentsContainer = document.querySelector('#contents-container');
    this.contentsContainer.textContent = '';

    this.productInformationInput.render(this.contentsContainer);
    this.productCatalogTable.render(this.contentsContainer);
  }
}
