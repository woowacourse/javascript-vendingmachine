import { COIN_10, COIN_100, COIN_50, COIN_500 } from '../constant/rule';

export const generateItemManageTabContentTemplate = (itemList) => `
    <form id="item-info-form" class="input-form">
      <label>추가할 상품 정보를 입력해주세요(상품명, 가격, 수량).</label>
      <div class="input-form-container">
        <input class="item-info-input" type="text" placeholder="상품명" minlength="1" maxlength="10" autofocus/>
        <input class="item-info-input" type="number" placeholder="가격" min="100" max="10000" step="10"/>
        <input class="item-info-input" type="number" placeholder="수량" min="1" max="20"/>
        <button class="input-form-button">추가</button>
      </div>
    </form>
    <div class="table-container">
      <table class="item-status-table">
        <caption><h2>상품 현황</h2></caption>
        <tr>
          <th><span>상품명</span></th>
          <th><span>가격</span></th>
          <th><span>수량</span></th>
          <th><span></span></th>
        </tr>
        ${itemList.map((itemInfo) => generateItemManageTableRowTemplate(itemInfo)).join('')}
      </table>
    </div>
`;

export const generateItemManageTableRowTemplate = ({ itemName, itemPrice, itemQuantity }) => `
    <tr data-item-name="${itemName}">
      <td><input class="item-info-input-cell" value="${itemName}" type="text" minlength="1" maxlength="10" disabled/></td>
      <td><input class="item-info-input-cell" value="${itemPrice}" type="number" min="100" max="10000" step="10" disabled/></td>
      <td><input class="item-info-input-cell" value="${itemQuantity}" type="number" min="1" max="20" disabled/></td>
      <td class="item-button-cell">
        <div>
          <button type="button" class="default-button edit-item-button">수정</button>
          <button type="button" class="default-button delete-item-button">삭제</button>
        </div>
      </td>
      <td class="item-button-cell hide">
        <div>
          <button type="button" class="default-button confirm-item-button">확인</button>
          <button type="button" class="default-button cancel-item-button">취소</button>
        </div>
      </td>
    </tr>
`;

export const generateCoinRechargeTabContentTemplate = (chargedAmount, coinCollection) => `
    <form id="cash-charge-form" class="input-form">
        <label>자판기가 보유할 금액을 입력해주세요</label>
        <div class="input-form-container">
          <input class="cash-charge-input" type="number" placeholder="금액" min="10" max="100000" step="10" autofocus/>
          <button class="input-form-button">충전</button>
        </div>
    </form>
    <p class="vendingmachine-total-amount">현재 보유 금액: <span id="charged-amount">${chargedAmount}</span>원</p>
    <table class="vendingmachine-coin-table">
      <caption><h2>자판기가 보유한 동전</h2></caption>
      <tr>
        <th>동전</th>
        <th>개수</th>
      </tr>
      <tr>
        <td>500원</td>
        <td class="coin-count" data-coin-value="500">${coinCollection[COIN_500]}개</td>
      </tr>
      <tr>
        <td>100원</td>
        <td class="coin-count" data-coin-value="100">${coinCollection[COIN_100]}개</td>
      </tr>
      <tr>
        <td>50원</td>
        <td class="coin-count" data-coin-value="50">${coinCollection[COIN_50]}개</td>
      </tr>
      <tr>
        <td>10원</td>
        <td class="coin-count" data-coin-value="10">${coinCollection[COIN_10]}개</td>
      </tr>
    </table>
`;

export const generateItemPurchaseContentTemplate = (moneyAmount, itemList, change) => `
  <form id="item-purchase-form" class="input-form">
    <label>상품을 구매할 금액을 투입해주세요</label>
    <div class="input-form-container">
      <input class="item-purchase-input" type="number" placeholder="금액" min="10" max="10000" step="10" autofocus/>
      <button class="input-form-button">투입</button>
    </div>
  </form>
  <p class="total-user-input-amount">투입한 금액: <span id="input-amount">${moneyAmount}</span>원</p>
  <div class="table-container">
    <table class="item-status-table">
      <caption><h2>구매 가능 상품 현황</h2></caption>
      <tr>
          <th><span>상품명</span></th>
          <th><span>가격</span></th>
          <th><span>수량</span></th>
          <th><span></span></th>
      </tr>
      ${itemList.map((itemInfo) => generateItemPurchaseTableRowTemplate(itemInfo)).join('')}
    </table>
  </div>
  <table class="change-table">
    <caption><h2>잔돈 반환</h2></caption>
    <tr>
      <th>동전</th>
      <th>개수</th>
    </tr>
    <tr>
      <td>500원</td>
      <td class="coin-count" data-coin-value="500">${change[COIN_500]}개</td>
    </tr>
    <tr>
      <td>100원</td>
      <td class="coin-count" data-coin-value="100">${change[COIN_100]}개</td>
    </tr>
    <tr>
      <td>50원</td>
      <td class="coin-count" data-coin-value="50">${change[COIN_50]}개</td>
    </tr>
    <tr>
      <td>10원</td>
      <td class="coin-count" data-coin-value="10">${change[COIN_10]}개</td>
    </tr>
  </table>
  <button type="button" class="default-button give-change-button">반환</button>
`;

export const generateItemPurchaseTableRowTemplate = ({ itemName, itemPrice, itemQuantity }) => `
  <tr data-item-name="${itemName}">
    <td>${itemName}</td>
    <td>${itemPrice}</td>
    <td class="item-quantity">${itemQuantity}</td>
    <td class="item-button-cell">
        <button type="button" class="default-button purchase-item-button">구매</button>
    </td>
  </tr>
`;

export const generateConfirmMessage = (itemName) => `정말 '${itemName}' 상품을 삭제하시겠습니까?`;

export const loginUserPageTemplate = `
  <h1>로그인</h1>
  <form class="input-form user-info-form">
    <label>이메일</label>
    <input name="email" type="email" placeholder="이메일 주소를 입력해주세요" autofocus/>
    <label>비밀번호</label>
    <input name="password" type="password" placeholder="비밀번호를 입력해주세요"/>
    <button class="input-form-button">확인</button>
  </form>
  <p class="register-link-text">아직 회원이 아니신가요? <a href="#register">회원가입</a>
`;

export const registerUserPageTemplate = `
  <h1>회원가입</h1>
  <form class="input-form user-info-form" >
    <label>이메일</label>
    <input name="email" type="email" placeholder="이메일 주소를 입력해주세요" autofocus/>
    <label>이름</label>
    <input name="name" type="text" minlength="2" maxlength="6" placeholder="이름을 입력해주세요"/>
    <label>비밀번호</label>
    <input name="password" type="password" placeholder="비밀번호를 입력해주세요"/>
    <label>비밀번호 확인</label>
    <input name="confirmPassword" type="password" placeholder="비밀번호를 입력해주세요"/>
    <button class="input-form-button">확인</button>
  </form>
`;

export const vendingMachineNavBarTemplate = (isLoginUser) => `
  ${
    isLoginUser
      ? '<button type="button" id="logout-button" class="default-button">로그아웃</button>'
      : '<a id="login-button" class="default-button" href="#login">로그인</a>'
  }
  <h1>🍿 자판기 🍿</h1>
  <nav>
    <a id="item-manage-tab-button" class="nav-tab-button" href="#item-manage">상품 관리</a>
    <a id="coin-recharge-tab-button" class="nav-tab-button" href="#coin-recharge">잔돈 충전</a>
    <a id="item-purchase-tab-button" class="nav-tab-button selected" href="#item-purchase">상품 구매</a>
  </nav>
  <section id="tab-content"></section>
  <div class="snackbar"></div>
`;
