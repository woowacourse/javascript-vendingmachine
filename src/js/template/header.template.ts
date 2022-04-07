const headerTemplate = {
  loggedOut: () => `<h2>자판기</h2>
  <a class="nav-button" href="#!login">
  로그인
  </a>`,
  loggedIn: (userName) => `<h2>자판기</h2>
    <div class="user-avatar-container">
      <div class="user-avatar">${userName}</div>
      <div class="tooltip">
        <button id="logout" class="tooltip-menu">로그아웃</button>
        <a class="tooltip-menu" href="#!userInfo">회원정보수정</a>
      </div>
    </div>
    <nav id="page-tab-container">
      <a class="nav-button product-management-button" href="#!productManagement">
      상품 관리
      </a>
      <a class="nav-button changes-charge-button" href="#!changesCharge">
        잔돈 충전
      </a>
      <a class="nav-button product-purchase-button" href="#!purchaseProduct">
        상품 구매
      </a>
    </nav>
    `,
};

export default headerTemplate;
