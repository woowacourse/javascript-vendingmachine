import { ProductInformationInput } from '../component/ProductInformationInput';
import { ProductCatalogTable } from '../component/ProductCatalogTable';
import { ProductCatalog } from '../domain/ProductCatalog';

export class ProductManageView {
  productInformationInput: ProductInformationInput;
  productCatalogTable: ProductCatalogTable;
  contentsContainer: HTMLDivElement;
  productCatalog: ProductCatalog;

  constructor() {
    this.productCatalog = new ProductCatalog();

    this.contentsContainer = document.querySelector('#contents-container');
    this.contentsContainer.textContent = '';

    this.productInformationInput = new ProductInformationInput({
      target: this.contentsContainer,
      productCatalog: this.productCatalog,
    });
    this.productCatalogTable = new ProductCatalogTable({
      target: this.contentsContainer,
      productCatalog: this.productCatalog,
    });

    this.productInformationInput.render();
    this.productCatalogTable.render();
  }
}
