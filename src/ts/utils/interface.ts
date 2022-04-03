interface ProductInfoProps {
  validateProductInfo: (args: ProductProps) => void;
  validateEditProductInfo: (args: ValidateProductProps) => void;
  addProductList: (args: ProductProps) => void;
  removeProduct: (args: string) => void;
  editProduct: (args: ProductEditProps) => void;
  getProductList: () => ProductProps | [];
}

interface ChargeInfoProps {
  convertRandomCharge: (args: number) => void
  pickNumberInList: () => number;
  setCoinList: () => void;
  getCoinList: () => CoinType;
  setTotalCharge: () => void;
  getTotalCharge: () => number;
}

interface PurchaseInfoProps{
  returnCharge: () => void;
  updateProductList: () => void;
  purchaseProduct: ({ productName, productPrice }: ProductProps) => void;
  setInsertMoney: () => void;
  getInsertMoney: () => number;
  setProductList: () => void;
  getProductList: () => ProductProps | [];
}

interface ProductProps {
  productName: string;
  productPrice: number;
  productQuantity: number;
};

interface ValidateProductProps {
  productName: string;
  productPrice: number;
  productQuantity: number;
  beforeProductName: string;
}

interface ProductEditProps {
  productName: string;
  productPrice: number;
  productQuantity: number;
  changeProductIndex: number;
}

interface ChangeEditProductInfoProps {
  target: HTMLElement;
  productName: string;
  productPrice: number;
  productQuantity: number;
}

interface EditInsertMoneyProps {
  totalMoney: number;
  productPrice: number;
}

interface CoinType {
  10: number;
  50: number;
  100: number;
  500: number;
}

type Coins = 500 | 100 | 50 | 10;

export { 
  ProductInfoProps,
  ChargeInfoProps,
  PurchaseInfoProps,
  ProductProps,
  ChangeEditProductInfoProps,
  ProductEditProps,
  EditInsertMoneyProps,
  ValidateProductProps,
  CoinType
};