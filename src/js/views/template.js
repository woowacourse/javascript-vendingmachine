export const CATEGORY_TEMPLATE = {
  MANAGE: `
    <h2 hidden>상품 관리</h2>
    <form id="product-add-form">
      <label>추가할 상품 정보를 입력해주세요.</label>
      <div class="form-input product-manage-input-width">
        <input
          id="product-name-input"
          type="text"
          placeholder="상품명"
          maxlength="10"
          required
          aria-labelledby="product-information"
        />
        <input
          id="product-price-input"
          type="number"
          placeholder="가격"
          min="100"
          max="10000"
          step="10"
          required
          aria-labelledby="product-information"
        />
        <input
          id="product-quantity-input"
          type="number"
          placeholder="수량"
          min="1"
          max="20"
          required
          aria-labelledby="product-information"
        />
        <button class="hover-button">추가</button>
      </div>
    </form>
    <table class="table">
      <caption class="caption">
        상품 현황
      </caption>
      <colgroup>
        <col>
        <col width="24%">
        <col width="24%">
        <col width="24%">
      </colgroup>
      <thead></thead>
        <tr>
          <th>상품명</th>
          <th>가격</th>
          <th>수량</th>
        </tr>
      </thead>
      <tbody id="product-tbody"></tbody>
    </table>
  `,
  CHARGE: `
    <h2 hidden>잔돈 충전</h2>
    <form id="charge-form" class="form">
      <label>자판기가 보유할 금액을 입력해주세요.</label>
      <div class="form-input">
        <input
          id="charge-amount-input"
          class="input-width"
          type="number"
          placeholder="금액"
          min="10"
          max="100000"
          step="10"
          required
        />
        <button class="hover-button">구입</button>
      </div>
      <p class="current-amount"></p>
    </form>
    <table class="table">
      <caption class="caption">
        자판기가 보유한 동전
      </caption>
      <thead>
        <tr>
          <th>동전</th>
          <th>개수</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>500원</td>
          <td id="five-hundred-coin"></td>
        </tr>
        <tr>
          <td>100원</td>
          <td id="one-hundred-coin"></td>
        </tr>
        <tr>
          <td>50원</td>
          <td id="fifty-coin"></td>
        </tr>
        <tr>
          <td>10원</td>
          <td id="ten-coin"></td>
        </tr>
      </tbody>
    </table>
  `,
  PURCHASE: `
    <h2 hidden>상품 구매</h2>
    <form id="purchase-form" class="form">
      <label>상품을 구매할 금액을 투입해주세요.</label>
      <div class="form-input">
        <input id="product-purchase-input" class="input-width" type="number" step="10" min="10" max="10000" required placeholder="금액" />
        <button class="hover-button">투입</button>
      </div>
      <p class="current-amount"></p>
    </form>
    <table class="table">
      <caption class="caption">
        구매 가능 상품 현황
      </caption>
      <thead>
        <tr>
          <th>상품명</th>
          <th>가격</th>
          <th>수량</th>
          <th>구매</th>
        </tr>
      </thead>
      <tbody id="product-purchase-tbody"></tbody>
    </table>
    <table class="table">
      <caption class="caption">
        잔돈 반환
      </caption>
      <thead>
        <tr>
          <th>동전</th>
          <th>개수</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>500원</td>
          <td id="returned-five-hundred-coin"></td>
        </tr>
        <tr>
          <td>100원</td>
          <td id="returned-one-hundred-coin"></td>
        </tr>
        <tr>
          <td>50원</td>
          <td id="returned-fifty-coin"></td>
        </tr>
        <tr>
          <td>10원</td>
          <td id="returned-ten-coin"></td>
        </tr>
      </tbody>
    </table>
    <button type="button" class="button change-button">반환하기</button>
  `,
};
