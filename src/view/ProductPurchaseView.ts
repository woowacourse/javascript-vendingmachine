import { CoinVaultTable } from '../component/CoinVaultTable';
import { CustomerMoneyInput } from '../component/CustomerMoneyInput';
import { ProductCatalogTable } from '../component/ProductCatalogTable';
import { AppProps } from '../interfaces/interface';

export class ProductPurchaseView {
  contentsContainer: HTMLDivElement;
  customerMoneyInput: CustomerMoneyInput;
  productCatalogTable: ProductCatalogTable;
  returnBalanceTable: CoinVaultTable;

  constructor(AppProps: AppProps) {
    this.contentsContainer = AppProps.contentsContainer;
    const productPurchaseProps = {
      target: AppProps.contentsContainer,
      coinVault: AppProps.coinVault,
      productCatalog: AppProps.productCatalog,
    };

    this.contentsContainer.addEventListener('productPurchaseTabClick', this.showProductPurchaseTab);
    this.customerMoneyInput = new CustomerMoneyInput(productPurchaseProps);
    this.productCatalogTable = new ProductCatalogTable(productPurchaseProps);
    this.returnBalanceTable = new CoinVaultTable(productPurchaseProps);
    //TODO
    //component 생성 + 인자로 product puchaseprops넘기기
    //component1 => 구매할 금액 입력
    //component2 => 구매가능 상품현황
    //component3 => 잔돈반환
  }

  showProductPurchaseTab = () => {
    //Todo
    // erase all 과 render로 component 보여주기
    this.eraseAll();
    this.renderAll();
  };

  eraseAll() {
    this.contentsContainer.textContent = ``;
  }

  renderAll() {
    //Todo
    this.customerMoneyInput.render();
    this.productCatalogTable.render();
    this.returnBalanceTable.render();
    //component.render()
  }
}
