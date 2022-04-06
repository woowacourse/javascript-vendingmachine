import { ProductInformationInput } from '../component/ProductInformationInput';
import { ProductCatalogTable } from '../component/ProductCatalogTable';
import { AppProps } from '../interfaces/interface';
import { ProductCatalog } from '../domain/ProductCatalog';

export class ProductManageView {
  productInformationInput: ProductInformationInput;
  productCatalogTable: ProductCatalogTable;
  contentsContainer: HTMLDivElement;
  productCatalog: ProductCatalog;

  constructor(AppProps: AppProps) {
    this.contentsContainer = AppProps.contentsContainer;
    this.productCatalog = AppProps.productCatalog;

    const productManageProps = {
      target: AppProps.contentsContainer,
      productCatalog: AppProps.productCatalog,
      snackBar: AppProps.snackBar,
    };

    this.productInformationInput = new ProductInformationInput(productManageProps);
    this.productCatalogTable = new ProductCatalogTable(productManageProps);

    this.contentsContainer.addEventListener('productManageTabClick', this.showProductManageTab);
  }

  autoSignIn() {
    this.productCatalog = JSON.parse(sessionStorage.getItem('productCatalog'));
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
