import { ProductInformationInput } from '../component/ProductInformationInput';
import { ProductCatalogTable } from '../component/ProductCatalogTable';
import { ProductCatalog } from '../domain/ProductCatalog';

export class ProductManageView {
  productInformationInput: ProductInformationInput;
  productCatalogTable: ProductCatalogTable;
  contentsContainer: HTMLDivElement;
  productCatalog: ProductCatalog;
  props: object;

  constructor() {
    this.productCatalog = new ProductCatalog();
    this.contentsContainer = document.querySelector('#contents-container');

    const props = {
      target: this.contentsContainer,
      productCatalog: this.productCatalog,
    };
    this.productInformationInput = new ProductInformationInput(props);
    this.productCatalogTable = new ProductCatalogTable(props);

    props.target.addEventListener('productManageTabClick', this.showProductManageTab);
  }

  showProductManageTab = () => {
    this.eraseAll();
    this.renderAll();
  };

  eraseAll() {
    this.contentsContainer.textContent = '';
  }

  renderAll() {
    this.productInformationInput.render();
    this.productCatalogTable.render();
  }
}
