export interface Product {
  name: string;
  price: number;
  quantity: number;
}

export interface Coin {
  amount: number;
  count: number;
}

export interface View {
  render(): void;
  bindEvent(): void;
}

export interface ProductManageView extends View {
  $addProductForm: HTMLElement;
  $productContainer: HTMLElement;
  $additionalProductName: HTMLElement;
  $additionalProductPrice: HTMLElement;
  $additionalProductQuantity: HTMLElement;

  handleSubmitForm(e: Event): void;
  handleClickButtons(e: Event): void;
  setModifyForm(e: Event): void;
  modifyProduct(e: Event): void;
  deleteProduct(e: Event): void;
}