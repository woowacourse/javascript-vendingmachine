export interface Coins {
  coin500: number;
  coin100: number;
  coin50: number;
  coin10: number;
}

export interface ProductState {
  index: number;
  name: string;
  price: number;
  quantity: number;
}

import { SnackBar } from '../component/SnackBar';
import { CoinVault } from '../domain/CoinVault';
import { ProductCatalog } from '../domain/ProductCatalog';

export interface AppProps {
  app: HTMLDivElement;
  contentsContainer: HTMLDivElement;
  coinVault: CoinVault;
  productCatalog: ProductCatalog;
  snackBar: SnackBar;
}

export interface UserInfo {
  email: string;
  id: number;
  name: string;
}
