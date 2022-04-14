import { CoinChangesTable } from '../component/CoinChangesTable';
import { CustomerMoneyInput } from '../component/CustomerMoneyInput';
import { ProductCatalogTable } from '../component/ProductCatalogTable';
import { ProductPurchaseTable } from '../component/ProductPurchaseTable';
import { AppProps } from '../interfaces/interface';

export class ProductPurchaseView {
  contentsContainer: HTMLDivElement;
  customerMoneyInput: CustomerMoneyInput;
  productPurchaseTable: ProductPurchaseTable;
  productCatalogTable: ProductCatalogTable;
  returnBalanceTable: CoinChangesTable;

  constructor(props: AppProps) {
    this.contentsContainer = props.contentsContainer;
    const productPurchaseProps = {
      target: props.contentsContainer,
      coinVault: props.coinVault,
      productCatalog: props.productCatalog,
      snackBar: props.snackBar,
    };

    this.contentsContainer.addEventListener('productPurchaseTabClick', this.showProductPurchaseTab);
    this.customerMoneyInput = new CustomerMoneyInput(productPurchaseProps);
    this.productPurchaseTable = new ProductPurchaseTable(productPurchaseProps);
    this.returnBalanceTable = new CoinChangesTable(productPurchaseProps);
  }

  showProductPurchaseTab = () => {
    this.pushState();
    this.eraseAll();
    this.renderAll();
  };

  eraseAll() {
    this.contentsContainer.textContent = ``;
  }

  renderAll() {
    this.customerMoneyInput.render();
    this.productPurchaseTable.render();
    this.returnBalanceTable.render();
  }

  pushState() {
    const path = '/productPurchase';
    history.pushState({ path }, '', path);
  }
}
