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
        <button id="product-add-button">추가</button>
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
    <form class="form">
      <label for="charge-amount">자판기가 보유할 금액을 입력해주세요.</label>
      <div class="form-input">
        <input
          id="charge-amount"
          class="input-width"
          type="number"
          placeholder="금액"
          required
        />
        <button>구입</button>
      </div>
      <p class="current-amount">현재 보유 금액: 500원</p>
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
          <td>5개</td>
        </tr>
      </tbody>
    </table>
  `,
  PURCHASE: `
    <h2 hidden>상품 구매</h2>
    <form class="form">
      <label for="product-purchased">상품을 구매할 금액을 투입해주세요.</label>
      <div class="form-input">
        <input id="product-purchased" type="number" class="input-width" placeholder="금액" />
        <button>투입</button>
      </div>
      <p class="current-amount">투입한 금액: 3000원</p>
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
      <tbody>
        <tr>
          <td>콜라</td>
          <td>1000</td>
          <td>10</td>
          <td><button type="button">구매</button></td>
        </tr>
      </tbody>
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
          <td>5개</td>
        </tr>
      </tbody>
    </table>
    <button type="button" class="button change-button">반환하기</button>
  `,
};
