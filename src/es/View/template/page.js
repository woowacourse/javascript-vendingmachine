import User from '../../data/User';

const pageTemplate = {
  loginPage: `
    <section class="user-information-form-section">
        <form id="login-form" >
            <label>이메일<br>
                <input type="email" name="email" placeholder="이메일 주소를 입력해주세요">
            </label>
            <label>비밀번호<br>
                <input type="password" name="password" placeholder="비밀번호를 입력해주세요">
            </label>
            <button class="button accent">확인</button>
        </form>
        <label>아직 회원이 아니신가요?<button class="text-button" data-page="signUp">회원가입</button></label>
    </section>
  `,

  signUpPage: `
    <section class="user-information-form-section">
        <form id="signup-form" >
            <label>이메일<br>
                <input type="email" name="email" placeholder="이메일 주소를 입력해주세요">
            </label>
            <label>이름<br>
                <input type="text" name="name" placeholder="이름을 입력해주세요">
            </label>
            <label>비밀번호<br>
                <p class="input-guide">대문자 알파벳, 소문자 알파벳, 숫자를 각각 1자 이상 포함하는 전체 8자 이상의 비밀번호를 입력하세요.</p>
                <input type="password" name="password" placeholder="비밀번호를 입력해주세요">
            </label>
            <label>비밀번호 확인<br>
                <input type="password" name="passwordConfirm" placeholder="비밀번호를 입력해주세요">
            </label>
            <button class="button accent">확인</button>
        </form>
    </section>
  `,

  updateMyInfoPage: ({ email, name }) => `
    <section class="user-information-form-section">
      <form id="update-my-info-form" >
          <label>이메일<br>
              <input type="email" name="email" value=${email} disabled>
          </label>
          <label>이름<br>
              <input type="text" name="name" value=${name} placeholder="이름을 입력해주세요">
          </label>
          <label>비밀번호<br>
              <p class="input-guide">대문자 알파벳, 소문자 알파벳, 숫자를 각각 1자 이상 포함하는 전체 8자 이상의 비밀번호를 입력하세요.</p>
              <input type="password" name="password" placeholder="비밀번호를 입력해주세요">
          </label>
          <label>비밀번호 확인<br>
              <input type="password" name="passwordConfirm" placeholder="비밀번호를 입력해주세요">
          </label>
          <button class="button accent">확인</button>
      </form>
    </section>
  `,

  productManagementPage: `
    <section id="add-product-form-section" class="form-section">
      <form id="add-product-form">
          <label form="add-product-form">추가할 상품 정보를 입력해주세요.</label>
          <div class="add-product-input-wrap">
              <input type="text" name="name" placeholder="상품명" form="add-product-form" required>
              <input type="number" name="price" placeholder="가격" form="add-product-form" required>
              <input type="number" name="quantity" placeholder="수량" form="add-product-form" required>
              <button id="add-product-submit-button" class="button accent">추가</button>
          </div>
      </form>
    </section>
    <section id="product-table-section" class="table-section">
      <table id="product-table" class="table">
          <caption>상품 현황</caption>
          <thead>
              <tr>
                  <th width="22%">상품명</th>
                  <th width="22%">가격</th>
                  <th width="22%">수량</th>
                  <th width="34%"></th>
              </tr>
          </thead>
          <tbody>
          </tbody>
      </table>
    </section>
  `,

  vendingMachineChargeManagementPage: `
    <section id="vendingmachine-charge-form-section" class="form-section">
      <form id="vendingmachine-charge-form">
          <label form="vendingmachine-charge-form">자판기가 보유할 금액을 입력해주세요</label>
          <div class="vendingmachine-charge-wrap">
              <input type="number" name="vendingmachine-charge" placeholder="금액" form="vendingmachine-charge-form" required>
              <button id="vendingmachine-charge-submit-button" class="button accent">추가</button>
          </div>
      </form>
      <p>현재 보유 금액: <span id="total-vendingmachine-charge">0원</span></p>
    </section>
    <section id="vendingmachine-charge-table-section" class="table-section">
      <table id="vendingmachine-charge-table" class="table">
          <caption>자판기가 보유한 동전</caption>
          <thead>
              <tr><th>동전</th><th>개수</th></tr>
          </thead>
          <tbody>
              <tr><td>500원</td><td>0개</td></tr>
              <tr><td>100원</td><td>0개</td></tr>
              <tr><td>50원</td><td>0개</td></tr>
              <tr><td>10원</td><td>0개</td></tr>
          </tbody>
      </table>
    </section>
  `,

  productPurchasePage: `
    <section id="customer-charge-form-section" class="form-section">
      <form id="customer-charge-form">
          <label form="customer-charge-form">상품을 구매할 금액을 투입해주세요</label>
          <div class="customer-charge-wrap">
              <input type="number" name="customerCharge" placeholder="금액" form="customer-charge-form" required>
              <button id="customer-charge-submit-button" class="button accent">투입</button>
          </div>
      </form>
      <p>투입한 금액: <span id="total-customer-charge">0원</span></p>
    </section>
    <section id="product-table-section" class="table-section">
      <table id="product-table" class="table">
          <caption>구매 가능 상품 현황</caption>
          <thead>
              <tr>
                  <th width="25%">상품명</th>
                  <th width="25%">가격</th>
                  <th width="25%">수량</th>
                  <th width="35%">구매</th>
              </tr>
          </thead>
          <tbody></tbody>
      </table>
      </section>
      <section id="change-table-section" class="table-section">
      <table id="change-table" class="table">
          <caption>잔돈 반환</caption>
          <thead>
              <tr><th>동전</th><th>개수</th></tr>
          </thead>
          <tbody>
              <tr><td>500원</td><td>0개</td></tr>
              <tr><td>100원</td><td>0개</td></tr>
              <tr><td>50원</td><td>0개</td></tr>
              <tr><td>10원</td><td>0개</td></tr>
          </tbody>
      </table>
      <button id="return-change-button" class="button">반환</button>
    </section>
  `,
};

export default pageTemplate;
