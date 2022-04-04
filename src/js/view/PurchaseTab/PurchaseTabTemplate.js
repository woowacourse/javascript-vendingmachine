import { MONEY_NAME_STRING } from '../../constants';

export const purchaseTabTemplate = /* html */ `
<section class="form-section" aria-labelledby="purchase-tab-title">
  <h2 class="tab-title" id="purchase-tab-title">상품 구매하기</h2>
  
  <form id="user-money-form">
    <div class="instructions">
      <h3>🛒금액 투입 시 유의 사항</h3>
      <ul class="instructions-list">
        <li>금액은 최소 10원, 최대 10000원까지 투입할 수 있습니다.</li>
        <li>투입한 금액으로 상품 구매 후 잔액이 남은 경우 하단의 잔돈 반환 버튼으로 반환할 수 있습니다.</li>
        <li>자판기의 잔돈의 상태에 따라 잔액을 모두 반환하지 못할 수 있습니다.</li>
      </ul>
    </div>
    <label for="user-money">상품을 구매할 금액을 입력해주세요</label>
    <div class="input-form-wrapper">
      <input type="number" id="user-money-input" placeholder="금액" name="user-money" min="10" max="10000" step="10" required/>
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
  <tr class="product-table-row">
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
