import { COIN_TYPE } from '../constants';

export const template = {
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
  <button class="button">반환</button>
</section>
  `,
  productTableRowInners: ({ name, price, quantity }) => `
    <td>${name}</td>
    <td>${price.toLocaleString()}</td>
    <td>${quantity}</td>
    <td>
      <div class="button-group">
        <button class="button product-update-button" name="product-update" type="button">수정</button>
        <button class="button product-delete-button" name="product-delete" type="button">삭제</button>
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
        <button class="button product-update-confirm-button" name="product-update-confirm" type="button">확인</button>
        <button class="button product-update-cancel-button" name="product-update-cancel" type="button">취소</button>
      </div>
    </td>
  `,
  productPurchaseTableRowInners: ({ name, price, quantity }) => `
  <td>${name}</td>
  <td>${price.toLocaleString()}</td>
  <td>${quantity}</td>
  <td>
    <button class="button product-purchase-button" name="product-purchase" type="button">구매</button>
  </td>
  `,
  productPurchaseTableRows: products =>
    products
      .map(
        ({ name, price, quantity }, index) => `
      <tr data-primary-key="${index}">
        ${template.productPurchaseTableRowInners({ name, price, quantity })}
      </tr>`,
      )
      .join(''),
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
