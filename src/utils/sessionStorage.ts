import { CoinVault } from '../domain/CoinVault';
import { ProductCatalog } from '../domain/ProductCatalog';

export function getStorageCoinVault(): CoinVault {
  const objCoinVault = JSON.parse(sessionStorage.getItem('coinVault'));
  const coinVault = new CoinVault();
  if (objCoinVault !== null) {
    coinVault.addCoins(objCoinVault.coinsQuantity);
    coinVault.updateCustomerInput(objCoinVault.customerInput);
  }
  return coinVault;
}

export function getStorageProductCatalog(): ProductCatalog {
  const objProductCatalog = JSON.parse(sessionStorage.getItem('productCatalog'));
  const productCatalog = new ProductCatalog();
  if (objProductCatalog !== null) {
    Object.entries(objProductCatalog.productList).forEach((item) => {
      type product = { name: string; price: number; quantity: number };
      productCatalog.addProduct(
        (item[1] as product).name,
        (item[1] as product).price,
        (item[1] as product).quantity
      );
    });
  }
  return productCatalog;
}
