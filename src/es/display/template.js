import { COIN_TYPE } from '../constants';

export const template = {
  productPage: `
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
            <tr>
            </tr>
        </tbody>
    </table>
  </section>
  `,
  holdingAmountPage: `
  <section id="add-holding-amount-form-section" class="form-section">
    <form id="add-holding-amount-form">
        <label form="add-holding-amount-form">자판기가 보유할 금액을 입력해주세요</label>
        <div class="add-holding-amount-wrap">
            <input type="number" name="add-holding-amount" placeholder="금액" form="add-holding-amount-form" required>
            <button id="add-holding-amount-submit-button" class="button accent">추가</button>
        </div>
    </form>
    <p class="holding-amount">현재 보유 금액: <span id="total-holding-amount">0원</span></p>
  </section>
  <section id="holding-amount-table-section" class="table-section">
    <table id="holding-amount-table" class="table">
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
  productTableRowInners: ({ name, price, quantity }) => `
    <td>${name}</td>
    <td>${price.toLocaleString()}</td>
    <td>${quantity}</td>
    <td>
      <div class="button-group">
        <button class="button product-update-button" type="button">수정</button>
        <button class="button product-delete-button" type="button">삭제</button>
      </div>
    </td>
  `,
  productTableRows: products =>
    products
      .map(
        ({ name, price, quantity }, index) => `
        <tr data-primary-key="${index}">
          ${template.productTableRowInners({ name, price, quantity })}
        </tr>`,
      )
      .join(''),

  productTableRowUpdate: ({ name, price, quantity }) => `
    <td><input type="text" name="name" placeholder="상품명" value="${name}"></td>
    <td><input type="number" name="price" placeholder="가격" value="${price}"></td>
    <td><input type="number" name="quantity" placeholder="수량" value="${quantity}"></td>
    <td>
      <div class="button-group">
        <button class="button product-update-confirm-button" type="button">확인</button>
        <button class="button product-update-cancel-button" type="button">취소</button>
      </div>
    </td>
`,
  holdingAmountTableRows: coins =>
    coins
      .map(
        (coin, index) => `
      <tr>
        <td>${COIN_TYPE[index]}원</td>
        <td>${coin.toLocaleString()}개</td>
      </tr>`,
      )
      .join(''),
};
