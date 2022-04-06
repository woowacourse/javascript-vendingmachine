const TEMPLATE = {
  PRODUCT_MANAGEMENT: `
    <section class="tab__product-manage-tab">
      <h2 hidden>상품 관리 화면</h2>
      <form class="product-manage-form">
        <fieldset>
          <legend>추가할 상품 정보를 입력해주세요.</legend>
          <input type="text" name="productName" placeholder="상품명" maxlength="10" required />
          <input type="number" name="price" placeholder="가격" min="100" max="10000" required />
          <input type="number" name="quantity" placeholder="수량" min="1" max="20" required />
          <button type="submit" class="product-manage-form__add-button submit-button">추가</button>
        </fieldset>
      </form>
      <table id="product-list-table">
        <caption>
          상품 현황
        </caption>
        <thead>
          <tr>
            <th scope="col">상품명</th>
            <th scope="col">가격</th>
            <th scope="col">수량</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </section>
  `,
  CHARGE_TAB: `  
    <section class="tab__charge-tab">
      <h2 hidden>잔돈 충전 화면</h2>
      <form class="charge-form">
        <label>자판기가 보유할 금액을 입력해주세요.</label>
        <input type="number" name="change" placeholder="금액" min="10" max="100000" required />
        <button type="submit" class="charge-form__purchase-button submit-button">충전</button>
      </form>
      <p>현재 보유 금액: <span class="charge-amount">0</span>원</p>
      <table id="coin-list-table">
        <caption>
          자판기가 보유한 동전
        </caption>
        <thead>
          <tr>
            <th scope="col">동전</th>
            <th scope="col">개수</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>500원</td>
            <td><span class="coin-500-quantity">0</span>개</td>
          </tr>
          <tr>
            <td>100원</td>
            <td><span class="coin-100-quantity">0</span>개</td>
          </tr>
          <tr>
            <td>50원</td>
            <td><span class="coin-50-quantity">0</span>개</td>
          </tr>
          <tr>
            <td>10원</td>
            <td><span class="coin-10-quantity">0</span>개</td>
          </tr>
        </tbody>
      </table>
    </section>
  `,
  PURCHASE_TAB: `
    <section class="tab__purchase-tab">
      <h2 hidden>상품 구매 화면</h2>
      <form class="user-amount-form">
        <label>상품을 구매할 금액을 투입해주세요.</label>
        <input type="number" name="change" placeholder="금액" min="10" max="10000" required />
        <button type="submit" class="user-amount-form__charge-button submit-button">투입</button>
      </form>
      <p>투입한 금액: <span class="user-amount">0</span>원</p>
      <table id="purchasable-product-list-table">
        <caption>
          구매 가능 상품 현황
        </caption>
        <thead>
          <tr>
            <th scope="col">상품명</th>
            <th scope="col">가격</th>
            <th scope="col">수량</th>
            <th scope="col">구매</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
      <table id="change-return-table">
        <caption>
          잔돈 반환
        </caption>
        <thead>
          <tr>
            <th scope="col">동전</th>
            <th scope="col">개수</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>500원</td>
            <td><span class="change-500-quantity">0</span>개</td>
          </tr>
          <tr>
            <td>100원</td>
            <td><span class="change-100-quantity">0</span>개</td>
          </tr>
          <tr>
            <td>50원</td>
            <td><span class="change-50-quantity">0</span>개</td>
          </tr>
          <tr>
            <td>10원</td>
            <td><span class="change-10-quantity">0</span>개</td>
          </tr>
        </tbody>
      </table>
      <button type="button" class="button return-button">반환</button>
    </section>
  `,
  LOGIN_PAGE: `
    <section class="login-page">
      <h2>로그인</h2>
      <form class="login-form">
        <label>이메일</label>
        <input type="email" name="email" placeholder="woowacourse@gmail.com" required />
        <label>비밀번호</label>
        <input type="password" name="password" placeholder="비밀번호를 입력해주세요." required />
        <button type="submit" class="submit-button login-page__login-button">확인</button>
      </form>
      <p>아직 회원이 아니신가요? <a href="/javascript-vendingmachine/signup">회원가입</a></p>
   </section>
  `,
  SIGNUP_PAGE: `
    <section class="signup-page">
      <h2>회원가입</h2>
      <form class="signup-form">
        <label>이메일</label>
        <input type="email" name="email" placeholder="이메일 주소를 입력해주세요." required />
        <label>이름</label>
        <input type="text" name="userName" placeholder="이름을 입력해주세요." minlength="2" maxlength="6" required />
        <label>비밀번호</label>
        <input type="password" name="password" placeholder="비밀번호를 입력해주세요." required />
        <label>비밀번호 확인</label>
        <input type="password" name="passwordConfirm" placeholder="비밀번호를 입력해주세요." required />
        <button type="submit" class="submit-button signup-page__signup-button">확인</button>
      </form>
    </section>
  `,
  PROFILE_EDIT_PAGE: `
    <section class="profile-edit-page">
      <h2>회원 정보 수정</h2>
      <form class="profile-edit-form">
        <label>이메일</label>
        <input type="email" name="email" disabled />
        <label>이름</label>
        <input type="text" name="userName" minlength="2" maxlength="6" required />
        <label>비밀번호</label>
        <input type="password" name="password" placeholder="비밀번호를 입력해주세요." required />
        <label>비밀번호 확인</label>
        <input type="password" name="passwordConfirm" placeholder="비밀번호를 입력해주세요." required />
        <button type="submit" class="submit-button profile-edit-form__edit-button">확인</button>
      </form>
    </section>
  `,
  VENDING_MACHINE_PAGE: `
    <main id="app">
      <h1 class="title">🍿 자판기 🍿</h1>
      <nav class="nav">
        <button type="button" class="nav__product-manage-tab button focus-button" route="/javascript-vendingmachine/">
          상품 관리
        </button>
        <button type="button" class="nav__charge-tab button" route="/javascript-vendingmachine/charge">
          잔돈 충전
        </button>
        <button type="button" class="nav__product-purchase-tab button" route="/javascript-vendingmachine/purchase">
          상품 구매
        </button>
      </nav>
      <div id="tab">
        <product-management></product-management>
        <charge-tab class="hidden"></charge-tab>
        <purchase-tab class="hidden"></purchase-tab>
      </div>
    </main>
  `,
};

export default TEMPLATE;
