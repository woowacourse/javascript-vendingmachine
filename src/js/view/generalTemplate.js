export const loginLinkButtonTemplate = /* html */ `
<a class="tab-menu-button" id="login-link-button" href="#/login">로그인</a>
`;

const getUserImage = (userName) => /* html */ `
<svg width="50px" height="50px" id="user-button-image" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
  viewBox="0 0 50 50">
  <circle cx="25" cy="25" r="25" fill="#d6f4f8" stroke-width="0" />
  <text id="user-name-text" x="50%" y="36" text-anchor="middle" font-size="36">
    ${userName[0]}
  </text>
</svg>
`;

export const userButtonTemplate = (userName) => /* html */ `
  <button id="user-button">${getUserImage(userName)}</button>
`;

export const userButtonSelectBoxTemplate = /* html */ `
  <ul id="user-button-select-box">
    <li class="select-box-item" >
      <a href="#/user-info" id="user-info-link">사용자 정보</a>
    </li>
    <li class="select-box-item">
      <button type="button" id="logout-button">로그아웃</button>
    </li>
  </ul>
`;

export const notFoundTabTemplate = /* html */ `
<section title="존재하지 않는 페이지" class="not-found-section">
  <h2>🚫 <br> 페이지가 존재하지 않거나 <br> 접근 권한이 없습니다.</h2>
  <a href="/" class="tab-menu-button">시작 페이지로</a>
</section>`;

export const navigationTemplate = /* html */ `
  <nav id="tab-menu-navigation">
    <a id="manage-tab-menu" class="tab-menu-button" href="#/product">상품 관리</a>
    <a id="charge-tab-menu" class="tab-menu-button" href="#/charge">잔돈 충전</a>
    <a id="purchase-tab-menu" class="tab-menu-button" href="#/purchase">
      상품 구매
    </a>
  </nav>
`;
