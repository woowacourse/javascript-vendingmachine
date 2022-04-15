import { ProductInformationInput } from '../component/ProductInformationInput';
import { ProductCatalogTable } from '../component/ProductCatalogTable';
import { AppProps } from '../interfaces/interface';
import { ProductCatalog } from '../domain/ProductCatalog';

export class ProductManageView {
  productInformationInput: ProductInformationInput;
  productCatalogTable: ProductCatalogTable;
  contentsContainer: HTMLDivElement;
  productCatalog: ProductCatalog;

  constructor(props: AppProps) {
    this.contentsContainer = props.contentsContainer;
    this.productCatalog = props.productCatalog;

    const productManageProps = {
      target: props.contentsContainer,
      productCatalog: props.productCatalog,
      snackBar: props.snackBar,
    };

    this.productInformationInput = new ProductInformationInput(productManageProps);
    this.productCatalogTable = new ProductCatalogTable(productManageProps);

    this.contentsContainer.addEventListener('productManageTabClick', this.showProductManageTab);
  }

  autoSignIn() {
    this.productCatalog = JSON.parse(sessionStorage.getItem('productCatalog'));
  }

  showProductManageTab = () => {
    this.pushState();
    this.eraseAll();
    this.renderAll();
  };

  pushState() {
    const path = '/productManage';
    history.pushState({ path }, '', path);
  }

  eraseAll() {
    this.contentsContainer.textContent = '';
  }

  renderAll() {
    this.productInformationInput.render();
    this.productCatalogTable.render();
  }
}
