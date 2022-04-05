import { URL } from '../../constants/appContants';

export const mainTemplate = `
  <h1>🍿 자판기 🍿</h1>
  <button id="sign-button" class="sign-in" data-url=${URL.SIGN_IN}>로그인</button>
  <div class="nav-container">
    <button id="item-manage-tab" class="nav-button nav-button-clicked" data-url=${URL.MANAGE_ITEM}>상품 관리</button>
    <button id="money-charge-tab" class="nav-button" data-url=${URL.CHARGE_MONEY}>잔돈 충전</button>
    <button id="item-purchase-tab" class="nav-button" data-url=${URL.PURCHASE_ITEM}>상품 구매</button>
  </div>
  <div id="content"></div>
  <div id="snackbar"></div>
`;
