export interface Product {
  name?: string;
  price?: number;
  quantity?: number;
}

export interface Coin {
  amount?: number;
  count?: number;
}

export interface VendingMachineResource {
  products?: Array<Product>;
  coins?: Array<Coin>;
}
