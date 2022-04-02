import { MONEY_NAME_STRING } from '../constants';

export const manageProductTabTemplate = /* html */ `
<section class="form=section" aria-labelledby="manage-tab-title">
  <h2 class="tab-title" id="manage-tab-title">상품 추가하기</h2>
  <form id="add-product-form">
    <div class="instructions">
      <h3>🛒상품 추가 시 유의 사항</h3>
      <ul class="instructions-list">
        <li>상품명: 1자 이상 10자 이하</li>
        <li>가격: 100원 이상 10000원 이하, 10원 단위</li>
        <li>수량: 1개 이상 20개 이하</li>
      </ul>
    </div>
    <fieldset>
      <legend>추가할 상품 정보를 입력해주세요.</legend>
      <div class="input-wrapper">
        <label for="add-product-name">상품명
        <input type="text" name="add-product-name" id="add-product-name-input" placeholder="상품명" required/>
        </label>
      </div>
      <div class="input-wrapper">
        <label for="add-product-price">상품 가격</label>
        <input type="number" name="add-product-price" id="add-product-price-input" placeholder="가격" min="100" max="10000" required/>
      </div>
      <div class="input-wrapper">
        <label for="add-product-stock">상품 수량</label>
        <input type="number" name="add-product-stock" id="add-product-stock-input" placeholder="수량" min="1" max="20" required/>
      </div>
      <button type="submit" class="submit-button">추가</button>
    </fieldset>
  </form>
</section>
<table class="product-status-table">
  <caption>
    상품 현황
  </caption>
  <tr>
    <th>상품명</th>
    <th>가격</th>
    <th>수량</th>
    <th>관리</th>
  </tr>
</table>
`;

export const addChangeTabTemplate = /* html */ `
<section class="form=section" aria-labelledby="change-tab-title">
  <h2 class="tab-title" id="change-tab-title">잔돈 충전하기</h2>
  <form id="add-change-form">
    <div class="instructions">
      <h3>💰 잔돈 충전 시 유의 사항</h3>
      <ul class="instructions-list">
        <li>최소 충전 금액: 10원</li>
        <li>최대 충전 가능 금액: 100,000원</li>
      </ul>
    </div>
    <label for="change">자판기가 보유할 금액을 입력해주세요</label>
    <div>
      <input type="number" id="money-input" placeholder="금액" name="change" min="10" max="100000" step="10" required/>
      <button type="submit" class="submit-button">충전</button>
    </div>
  </form>
  <p>현재 보유 금액: <span id="total-change">0</span>원</p>
</section>
<table class="coin-status-table">
  <caption>
    자판기가 보유한 동전
  </caption>
  <tr>
    <th>동전</th>
    <th>개수</th>
  </tr>
  <tr>
    <td>500원</td>
    <td data-coin-name='${MONEY_NAME_STRING.COIN_500_WON}'>0개</td>
  </tr>
  <tr>
    <td>100원</td>
    <td data-coin-name='${MONEY_NAME_STRING.COIN_100_WON}'>0개</td>
  </tr>
  <tr>
    <td>50원</td>
    <td data-coin-name='${MONEY_NAME_STRING.COIN_50_WON}'>0개</td>
  </tr>
  <tr>
    <td>10원</td>
    <td data-coin-name='${MONEY_NAME_STRING.COIN_10_WON}'>0개</td>
  </tr>
</table>
`;

export const productTableRowTemplate = ({ name, price, stock, id }) => /* html */ `
<tr>
  <td class="product-name">${name}</td>
  <td class="product-price">${price}</td>
  <td class="product-stock">${stock}</td>
  <td>
    <div class="table-button-wrapper">
      <button type="button" class="update-product-button" data-product-id=${id}>수정</button>
      <button type="button" class="remove-product-button" data-product-id=${id}>삭제</button>
    </div>
  </td>
</tr>
`;

export const productUpdateTableRowTemplate = ({ name, price, stock, id }) => /* html */ `
<tr>
  <td><input type="text" class="update-product-name-input" value="${name}" /></td>
  <td><input type="number" class="update-product-price-input" value="${price}" /></td>
  <td><input type="number" class="update-product-stock-input" value="${stock}" /></td>
  <td>
    <div class="table-button-wrapper">
      <button type="button" class="confirm-update-button" data-product-id=${id}>
      확인
      </button>
      <button type="button" class="cancel-update-button" data-product-id=${id}>
      취소
      </button>
    </div>
  </td>
</tr>
`;

export const purchaseTabTemplate = /* html */ `
<section class="form-section" aria-labelledby="purchase-tab-title">
  <h2 class="tab-title" id="purchaseTabTemplate">상품 구매하기</h2>
  
  <form id="money-insert-form">
    <div class="instructions">
      <h3>🛒금액 투입 시 유의 사항</h3>
      <ul class="instructions-list">
      </ul>
    </div>
    <label for="money-insert">상품을 구매할 금액을 입력해주세요</label>
    <div>
      <input type="number" id="money-insert-input" placeholder="금액" name="money-insert" min="10" max="10000" step="10" required/>
      <button type="submit" class="submit-button">투입</button>
    </div>
  </form>
  <p>투입한 금액: <span id="total-insert">0</span>원</p>
</section>
<table class="product-status-table">
  <caption>
    구매 가능한 상품 현황
  </caption>
  <tr>
    <th>상품명</th>
    <th>가격</th>
    <th>수량</th>
    <th>관리</th>
  </tr>
</table>
<table class="coin-status-table">
  <caption>
    잔돈 반환
  </caption>
  <tr>
    <th>동전</th>
    <th>개수</th>
  </tr>
  <tr>
    <td>500원</td>
    <td data-coin-name='${MONEY_NAME_STRING.COIN_500_WON}'>0개</td>
  </tr>
  <tr>
    <td>100원</td>
    <td data-coin-name='${MONEY_NAME_STRING.COIN_100_WON}'>0개</td>
  </tr>
  <tr>
    <td>50원</td>
    <td data-coin-name='${MONEY_NAME_STRING.COIN_50_WON}'>0개</td>
  </tr>
  <tr>
    <td>10원</td>
    <td data-coin-name='${MONEY_NAME_STRING.COIN_10_WON}'>0개</td>
  </tr>
</table>
<button type="button" id="return-change-button">반환</button>
`;

export const purchaseProductTableRowTemplate = ({
  name,
  price,
  stock,
  id,
}) => /* html */ `
  <tr>
    <td class="product-name">${name}</td>
    <td class="product-price">${price}</td>
    <td class="product-stock">${stock}</td>
    <td>
      <div class="table-button-wrapper">
        <button type="button" class="purchase-product-button" data-product-id="${id}">구매</button>
      </div>
    </td>
  </tr>
  `;

export const notFoundTabTemplate = /* html */ `
<section title="존재하지 않는 페이지" class="not-found-section">
  <h2>🛒 Page Not Found</h2>
  <a href="#/manage" class="tab-menu-button">시작 페이지로</a>
</section>`;
