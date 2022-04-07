const navTemplate = `
    <nav class="user-navigation"> 
      <a type="button" class="tab-menu-button" id="to-login-anchor" href="#/login">
        로그인 
        </a>
    <button type="button" class="user-navigation-profile--button hide">
        우
  </button>
  <ul class="user-navigation--ul hide">
    <li type="button" class="user-navigation--li">
      <a href="#/myprofile" id="user-navigation-profile">Profile</a>
    </li>
    <li type="button" class="user-navigation--li" id="logout">
      Logout
    </li>
  </ul>
    </nav>
    <h1 id="app-title">🍿 자판기 🍿</h1>
    <nav id="tab-menu-navigation">
        <a type="button" id="manage-tab-menu" class="tab-menu-button" href="#/manage">
          상품 관리
        </a>
        <a type="button" id="charge-tab-menu" class="tab-menu-button" href="#/charge">
          잔돈 충전
        </a>
        <a type="button" id="purchase-tab-menu" class="tab-menu-button" href="#/purchase">
          상품 구매
        </a>
    </nav>
    `;

export default navTemplate;
