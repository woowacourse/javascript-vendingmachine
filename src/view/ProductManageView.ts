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
    const productManageProps = {
      target: AppProps.contentsContainer,
      productCatalog: AppProps.productCatalog,
      snackBar: AppProps.snackBar,
    };

    this.productInformationInput = new ProductInformationInput(productManageProps);
    this.productCatalogTable = new ProductCatalogTable(productManageProps);

    this.contentsContainer.addEventListener('productManageTabClick', this.showProductManageTab);
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
