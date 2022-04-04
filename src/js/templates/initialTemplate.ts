export const initialTemplate: string = `
  <div class="header">
  <button id="login-button">로그인</button>
    <h1>🍿 자판기 🍿</h1>
    <div class="nav-container">
      <button id="item-manage-tab" class="nav-button nav-button-clicked">상품 관리</button>
      <button id="money-charge-tab" class="nav-button">잔돈 충전</button>
      <button id="item-purchase-tab" class="nav-button">상품 구매</button>
    </div>
  </div>
  <div id="content"></div>
  <div id="snackbar"></div>
`;
