interface ProductInfoProps {
  validateProductInfo: (args: ProductProps) => void;
  validateEditProductInfo: (args: ValidateProductProps) => void;
  addProductList: (args: ProductProps) => void;
  removeProduct: (args: string) => void;
  editProduct: (args: ProductEditProps) => void;
  getProductList: () => ProductProps | [];
  getUserName: () => string;
}

interface ChargeInfoProps {
  convertRandomCharge: (args: number) => void
  pickNumberInList: () => number;
  setCoinList: () => void;
  getCoinList: () => CoinsProps;
  setTotalCharge: () => void;
  getTotalCharge: () => number;
  getUserName: () => string;
}

interface PurchaseInfoProps{
  returnCharge: () => void;
  calulateReturnCharge: (args: number) => void;
  updateProductList: () => void;
  purchaseProduct: ({ productName, productPrice }: PurchaseProductProps) => void;
  plusInsertMoney: (args: number) => void;
  setInsertMoney: () => void;
  getInsertMoney: () => number;
  setProductList: () => void;
  getProductList: () => ProductProps | [];
  setCoinList: () => void;
  getCoinList: () => CoinsProps;
  operationDependCoinKind: (args: CoinsType) => void;
}

interface ProductProps {
  productName: string;
  productPrice: number;
  productQuantity: number;
};

interface PurchaseProductProps {
  productName: string;
  productPrice: number;
}

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

interface CoinsProps {
  10: number;
  50: number;
  100: number;
  500: number;
}

interface UserInfoProps {
  email: string;
  name: string;
  password: string;
}
interface RegisterUserProps {
  method: string;
  url: string;
  users: UserInfoProps;
}

interface ValidateNameInfoProps {
  nameInputValue: string;
  nameInfoMessage: HTMLElement;
}

interface ValidatePasswordInfoProps {
  passwordInputValue: string;
  passwordInfoMessage: HTMLElement;
}

interface ValidatePasswordConfirmInfoProps {
  passwordConfirmInputValue: string;
  passwordInputValue: string;
  passwordConfirmInfoMessage: HTMLElement;
}

interface ValidateEmailInfoProps {
  emailInputValue: string;
  emailInfoMessage: HTMLElement;
}

type ConvertTemplate = (path: string) => void;

type PagePath = "#login" | "#signup" | "#editMember" | "#product" | "#charge" | "#purchase";

type CoinsType = 500 | 100 | 50 | 10;

export { 
  ProductInfoProps,
  ChargeInfoProps,
  PurchaseInfoProps,
  ProductProps,
  PurchaseProductProps,
  ChangeEditProductInfoProps,
  ProductEditProps,
  EditInsertMoneyProps,
  ValidateProductProps,
  ValidateNameInfoProps,
  ValidatePasswordInfoProps,
  ValidatePasswordConfirmInfoProps,
  ValidateEmailInfoProps,
  RegisterUserProps,
  ConvertTemplate,
  CoinsProps,
  CoinsType,
};
