export const TEMPLATE = {
  MANAGE_PRODUCT: `
    <section title="상품 정보">
      <form id="add-product-form">
        <fieldset>
          <legend>추가할 상품 정보를 입력해주세요.</legend>
          <input type="text" id="add-product-name-input" placeholder="상품명" required/>
          <input type="number" id="add-product-price-input" placeholder="가격" min="100" max="10000" required/>
          <input type="number" id="add-product-stock-input" placeholder="수량" min="1" max="20" required/>
          <button type="submit" class="submit-button">추가</button>
        </fieldset>
      </form>
    </section>
    <section class="table-section" title="상품 현황">
      <table id="product-status-table" class="product-table">
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
    </section>
  `,
  ADD_CHANGE: `
    <section title="잔돈 충전">
      <form id="add-change-form">
        <label for="change-input">자판기가 보유할 금액을 입력해주세요</label>
        <div>
          <input type="number" id="change-input" placeholder="금액" />
          <button type="submit" class="submit-button">충전</button>
        </div>
      </form>
      <p>현재 보유 금액: <span id="total-change">0</span>원</p>
    </section>
    <section class="table-section" title="자판기가 보유한 동전">
      <table id="coin-status-table" class="coin-table">
        <caption>
          자판기가 보유한 동전
        </caption>
        <tr>
          <th>동전</th>
          <th>개수</th>
        </tr>
        <tr>
          <td>500원</td>
          <td data-coin-name='FIVE_HUNDRED_WON'>0개</td>
        </tr>
        <tr>
          <td>100원</td>
          <td data-coin-name='ONE_HUNDRED_WON'>0개</td>
        </tr>
        <tr>
          <td>50원</td>
          <td data-coin-name='FIFTY_WON'>0개</td>
        </tr>
        <tr>
          <td>10원</td>
          <td data-coin-name='TEN_WON'>0개</td>
        </tr>
      </table>
    </section>
  `,
  PRODUCT_TABLE_ROW: ({ name, price, stock, id }) => `
    <tr>
      <td class="product-name">${name}</td>
      <td class="product-price">${price}</td>
      <td class="product-stock" data-product-id=${id}>${stock}</td>
      <td>
        <div class="table-button-wrapper">
          <button type="button" class="update-product-button" data-product-id=${id}>수정</button>
          <button type="button" class="remove-product-button" data-product-id=${id}>삭제</button>
        </div>
      </td>
    </tr>
  `,
  UPDATE_PRODUCT_TABLE_ROW: ({ name, price, stock, id }) => `
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
  `,
  PURCHASE: `
    <section title="구매 금액 투입">
      <form id="insert-money-form">
        <label for="insert-money-input">상품을 구매할 금액을 투입해주세요</label>
        <div>
          <input type="number" id="insert-money-input" placeholder="금액" />
          <button type="submit" class="submit-button">투입</button>
        </div>
      </form>
      <p>투입한 금액: <span id="total-insert-money">0</span>원</p>
    </section>
    <section class="table-section" title="구매 가능 상품 현황">
      <table id="purchaseable-product-status-table" class="product-table" >
        <caption>
          구매 가능 상품 현황
        </caption>
        <tbody id="purchaseable-product-status-tbody">
        </tbody>
      </table>
    </section>
    <section class="table-section" title="잔돈 반환">
      <table id="return-coin-status-table" class="coin-table">
        <caption>
          잔돈 반환
        </caption>
        <tr>
          <th>동전</th>
          <th>개수</th>
        </tr>
        <tr>
          <td>500원</td>
          <td data-coin-name='FIVE_HUNDRED_WON'>0개</td>
        </tr>
        <tr>
          <td>100원</td>
          <td data-coin-name='ONE_HUNDRED_WON'>0개</td>
        </tr>
        <tr>
          <td>50원</td>
          <td data-coin-name='FIFTY_WON'>0개</td>
        </tr>
        <tr>
          <td>10원</td>
          <td data-coin-name='TEN_WON'>0개</td>
        </tr>
      </table>
      <button type="button" id="return-change-button">반환</button>
    </section>`,
  PURCHASEABLE_PRODUCT_TABLE_BODY: `
    <tr>
      <th>상품명</th>
      <th>가격</th>
      <th>수량</th>
      <th>관리</th>
    </tr>
  `,
  PURCHASEABLE_PRODUCT_TABLE_ROW: ({ name, price, stock, id }) => `
    <tr>
      <td class="product-name">${name}</td>
      <td class="product-price">${price}</td>
      <td class="product-stock">${stock}</td>
      <td>
        <div class="table-button-wrapper">
          <button type="button" class="purchase-product-button" data-product-id=${id}>구매</button>
        </div>
      </td>
    </tr>
  `,
  NOT_FOUND: `
    <section title="존재하지 않는 페이지" class="not-found-section">
      <h2>🛒 Page Not Found</h2>
      <a href="#/manage" class="tab-menu-button">시작 페이지로</a>
    </section>
  `,
};
