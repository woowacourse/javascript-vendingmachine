export const initialTemplate = `
  <div class="header">
  <div id="header-button-container"><button id="login-button">로그인</button></div>
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

export const headerButtonTemplate = isLogIn =>
  isLogIn
    ? `
    <div id="user-container">
      <button id="user-badge"><span id="user-name"></span></button>
      <ul id="user-dropbox" class="display-none">
       <li id="change-user-info">정보 수정</li>
       <li id="logout">로그아웃</li>
      </ul>
    </div>
        `
    : `<button id="login-button">로그인</button>`;
