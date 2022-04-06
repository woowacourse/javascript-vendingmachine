import { CoinChangesTable } from '../component/CoinChangesTable';
import { CoinVaultTable } from '../component/CoinVaultTable';
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

  constructor(AppProps: AppProps) {
    this.contentsContainer = AppProps.contentsContainer;
    const productPurchaseProps = {
      target: AppProps.contentsContainer,
      coinVault: AppProps.coinVault,
      productCatalog: AppProps.productCatalog,
      snackBar: AppProps.snackBar,
    };

    this.contentsContainer.addEventListener('productPurchaseTabClick', this.showProductPurchaseTab);
    this.customerMoneyInput = new CustomerMoneyInput(productPurchaseProps);
    this.productPurchaseTable = new ProductPurchaseTable(productPurchaseProps);
    this.returnBalanceTable = new CoinChangesTable(productPurchaseProps);
  }

  showProductPurchaseTab = () => {
    this.eraseAll();
    this.renderAll();
  };

  eraseAll() {
    this.contentsContainer.textContent = ``;
  }

  renderAll() {
    console.log('여기서 customerMoneyInput.render에서 계속 bind됨');
    this.customerMoneyInput.render();
    this.productPurchaseTable.render();
    this.returnBalanceTable.render();
  }
}
