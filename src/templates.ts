import { CONFIGURATION } from './constants';
import storage from './storage';

const TEMPLATE = {
  PRODUCT_MANAGEMENT: `
    <section class="tab__product-manage-tab">
      <h2 hidden>상품 관리 화면</h2>
      <form class="product-manage-form">
        <fieldset>
          <legend>추가할 상품 정보를 입력해주세요.</legend>
          <input type="text" name="name" placeholder="상품명" maxlength="${CONFIGURATION.NAME.MAX_LENGTH}" required />
          <input type="number" name="price" placeholder="가격" min="${CONFIGURATION.PRICE.MIN}" max="${CONFIGURATION.PRICE.MAX}" required />
          <input type="number" name="quantity" placeholder="수량" min="${CONFIGURATION.QUANTITY.MIN}" max="${CONFIGURATION.QUANTITY.MAX}" required />
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
        <input type="number" name="change" placeholder="금액" min="${CONFIGURATION.AMOUNT.UNIT}" max="${CONFIGURATION.AMOUNT.MAX}" required />
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
  <h2 hidden>잔돈 충전 화면</h2>
  <form class="purchase-form">
    <label>상품을 구매할 금액을 투입해주세요.</label>
    <input type="number" class="purchase-form__money-input" name="moneyInput" placeholder="금액" min="${CONFIGURATION.INPUT.MIN}" max="${CONFIGURATION.INPUT.MAX}" required />
    <button type="submit" class="purchase-form__money-input-button submit-button">투입</button>
    <p>투입한 금액: <span class="purchase-form__money-input-amount">0</span>원</p>
  </form>
  <table id="purchase-product-list-table">
    <caption>
      상품 현황
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
  <table id="purchase-coin-list-table">
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
        <td><span class="purchase-coin-500-quantity">0</span>개</td>
      </tr>
      <tr>
        <td>100원</td>
        <td><span class="purchase-coin-100-quantity">0</span>개</td>
      </tr>
      <tr>
        <td>50원</td>
        <td><span class="purchase-coin-50-quantity">0</span>개</td>
      </tr>
      <tr>
        <td>10원</td>
        <td><span class="purchase-coin-10-quantity">0</span>개</td>
      </tr>
    </tbody>
  </table>
  <button type="button" class="purchase-return-button">반환</button>
</section>
`,
  SIGNIN_PAGE: `
  <section class="signin">
    <form class="signin-form">
      <h1>로그인</h1>
      <label for="signin-form__email">이메일</label>
      <input id="signin-form__email" type="email" name="signinEmail" placeholder="woowacourse@gmail.com" required />
      <label for="signin-form__password">비밀번호</label>
      <input id="signin-form__password" type="password" name="signinPassword" placeholder="비밀번호를 입력해주세요" required />
      <button id="signin-form__button" type="submit">확인</button>
      <p>아직 회원이 아니신가요? <span class="signup-text">회원가입</span></p>
    </form>
  </section>
  `,
  SIGNUP_PAGE: `
  <section class="signup">
    <form class="signup-form">
      <h1>회원가입</h1>
      <label for="signup-form__email">이메일</label>
      <input id="signup-form__email" type="email" name="signupEmail" placeholder="이메일 주소를 입력해주세요" required/>
      <label for="signup-form__name">이름</label>
      <input id="signup-form__name" type="text" name="signupUserName" placeholder="이름을 입력해주세요" minlength="2" maxlength="6" required/>
      <label for="signup-form__password">비밀번호</label>
      <input id="signup-form__password" type="password" name="signupPassword" placeholder="비밀번호를 입력해주세요" required/>
      <label for="signup-form__password-confirm">비밀번호 확인</label>
      <input id="signup-form__password-confirm" type="password" name="signupPasswordConfirm" placeholder="비밀번호를 입력해주세요" required/>
      <button id="signup-form__button" type="submit">확인</button>
    </form>
  </section>
`,
  EDIT_PROFILE_PAGE: `
  <section class="edit-profile">
    <form class="edit-profile-form">
      <h1>회원 정보 수정</h1>
      <label for="edit-profile-form__email">이메일</label>
      <input id="edit-profile-form__email" type="email" name="editProfileEmail" disabled required/>
      <label for="edit-profile-form__name">이름</label>
      <input id="edit-profile-form__name" type="text" name="editProfileUserName" minlength="2" maxlength="6" required/>
      <label for="edit-profile-form__password">비밀번호</label>
      <input id="edit-profile-form__password" type="password" name="editProfilePassword" placeholder="비밀번호를 입력해주세요" required/>
      <label for="edit-profile-form__password-confirm">비밀번호 확인</label>
      <input id="edit-profile-form__password-confirm" type="password" name="editProfilePasswordConfirm" placeholder="비밀번호를 입력해주세요" required/>
      <button id="edit-profile-form__button" type="submit">확인</button>
    </form>
  </section>
`,
};

export default TEMPLATE;
