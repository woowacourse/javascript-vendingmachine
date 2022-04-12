export const getProductManageTemplate = `      
  <section class="tab-result-container" id="/javascript-vendingmachine/#!/product-manage">
    <h2 hidden>상품 관리</h2>
    <div class="tab-result-wrapper">
      <form id="product-manage-form">
        <div class="label-wrapper">
          <label for="product-name">추가할 상품 정보를 입력해주세요.</label>
        </div>
        <input class="product-manage-input" id="product-name" placeholder="상품명" type="text" size="10" minlength="1" maxlength="10" required />
        <input class="product-manage-input" id="product-price" placeholder="가격" type="number" step="10" min="100" max="100000" required />
        <input class="product-manage-input" id="product-quantity" placeholder="수량" type="number" min="1" max="20" required />
        <button class="short-button" id="add-button">추가</button>
      </form>
      <table>
        <colgroup>
          <col></col>
          <col></col>
          <col></col>
        </colgroup>
        <caption>
          상품 현황
        </caption>
        <thead>
          <tr>
            <th>상품명</th>
            <th>가격</th>
            <th>수량</th>
            <th></th>
          </tr>
        </thead>
        <tbody id="current-product-table"></tbody>
      </table>
    </div>
  </section> 
`;

export const getRechargeTemplate = `
  <section class="tab-result-container" id="/javascript-vendingmachine/#!/recharge">
    <h2 hidden>잔돈 충전</h2>
    <div class="tab-result-wrapper">
      <form id="recharge-form">
        <div class="label-wrapper">
          <label for="recharge-input">자판기가 보유할 금액을 입력해주세요</label>
        </div>
        <input class="long-input" id="recharge-input" placeholder="금액" type="number" step="10" max="100000" min="10" required />
        <button class="short-button" id="recharge-button">충전</button>
        <div class="holding-money-wrapper">현재 보유 금액: <span id="current-holding-money"></span>원</div>
      </form>
      <table class="change-table">
        <colgroup>
          <col style="width:30%"></col>
          <col style="width:30%"></col>
        </colgroup>
        <caption>
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
            <td><span id="coin-500"></span>개</td>
          </tr>
          <tr>
            <td>100원</td>
            <td><span id="coin-100"></span>개</td>
          </tr>
          <tr>
            <td>50원</td>
            <td><span id="coin-50"></span>개</td>
          </tr>
          <tr>
            <td>10원</td>
            <td><span id="coin-10"></span>개</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
`;

export const getPurchaseProduct = `
  <section class="tab-result-container" id="/javascript-vendingmachine/#!/purchase-product">
    <h2 hidden>상품 구매</h2>
    <div class="tab-result-wrapper">
      <div>
        <form id="insert-money-form">
          <div class="label-wrapper">
            <label for="insert-money-input">상품을 구매할 금액을 투입해주세요</label>
          </div>
          <input class="long-input" id="insert-money-input" placeholder="금액" type="number" step="10" max="10000" min="10" required />
          <button class="short-button" id="insert-button">투입</button>
          <div class="holding-money-wrapper">투입한 금액: <span id="current-inserted-money">0</span>원</div>
        </form>
      </div>

      <div>
        <table>
          <colgroup>
            <col></col>
            <col></col>
            <col></col>
          </colgroup>
          <caption>
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
          <tbody id="purchasable-product-table"></tbody>
        </table>
      </div>

      <div>
        <table class="change-table">
          <colgroup>
            <col style="width:30%"></col>
            <col style="width:30%"></col>
          </colgroup>
          <caption>
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
              <td><span id="purchase-tab-coin-500">0</span>개</td>
            </tr>
            <tr>
              <td>100원</td>
              <td><span id="purchase-tab-coin-100">0</span>개</td>
            </tr>
            <tr>
              <td>50원</td>
              <td><span id="purchase-tab-coin-50">0</span>개</td>
            </tr>
            <tr>
              <td>10원</td>
              <td><span id="purchase-tab-coin-10">0</span>개</td>
            </tr>
          </tbody>
        </table>
      </div>
      <button id="refund-button" class="long-button">반환</button>
    </div>
  </section>
`;

export const getNotFoundTemplate = `
<div id="not-found">
  <h1>죄송합니다. 요청하신 페이지를 찾을 수 없습니다.</h1>
</div>`;
