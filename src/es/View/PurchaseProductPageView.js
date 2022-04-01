import { $ } from '../utils';

export default class PurchaseProductPageView {
  loadPage = () => {
    $('main').innerHTML = `
    <section id="add-amount-for-purchase-form-section" class="form-section">
      <form id="add-amount-for-purchase-form">
          <label form="add-amount-for-purchase-form">상품을 구매할 금액을 투입해주세요</label>
          <div class="add-amount-for-purchase-wrap">
              <input type="number" name="add-amount-for-purchase" placeholder="금액" form="add-amount-for-purchase-form" required>
              <button id="add-amount-for-purchase-submit-button" class="button accent">투입</button>
          </div>
      </form>
      <p class="amount-for-purchase">투입한 금액: <span id="total-amount-for-purchase">0원</span></p>
    </section>
    <section id="product-table-section" class="table-section">
    <table id="product-table" class="table">
        <caption>구매 가능 상품 현황</caption>
        <thead>
            <tr>
                <th width="22%">상품명</th>
                <th width="22%">가격</th>
                <th width="22%">수량</th>
                <th width="34%">구매</th>
            </tr>
        </thead>
        <tbody>
            <tr>
              <td>콜라</td>
              <td>1500</td>
              <td>20</td>
              <td><button class="button">구매</button></td>
            </tr>
            <tr>
              <td>사이다</td>
              <td>1000</td>
              <td>10</td>
              <td><button class="button">구매</button></td>
            </tr>
        </tbody>
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
    `;
  };
}
