import { ProductProps } from "../../utils/interface";

const snackbarTemplate = (message: string) => {
  return `
    <div class="snackbar">
      <p class="snackbar-text">${message}</p>
    </div>
  `;
};

const purchaseProductText = (productName: string) => {
  return `${productName} 1개 구매 완료하였습니다.`;
};

const insertMoneyText = (insertMoney: number) => {
  return `${insertMoney}원 충전 완료하였습니다.`;
};

const registerProductText = ({ productName, productPrice, productQuantity }: ProductProps) => {
  return `${productName} ${productPrice}원 ${productQuantity}개 등록 완료하였습니다.`;
};

const deleteProductText = (productName: string) => {
  return `${productName} 삭제 완료하였습니다.`;
};

const editProductInfoText = ({ productName, productPrice, productQuantity }: ProductProps) => {
  return `${productName} ${productPrice}원 ${productQuantity}개로 수정 완료하였습니다.`;
};

export { 
  snackbarTemplate,
  purchaseProductText,
  insertMoneyText,
  registerProductText,
  deleteProductText,
  editProductInfoText,
};