export const productPurchaseTableRow = ({ name, stock, price, id }) => `
<tr>
  <td class="product-name">${name}</td>
  <td class="product-price">${price}</td>
  <td class="product-stock">${stock}</td>
  <td>
    <div class="table-button-wrapper">
      <button type="button" class="purchase-product-button" data-product-id=${id}>구매</button>
    </div>
  </td>
</tr>`;

export const purchaseTemplate = `<section>
<h2 hidden aria-labelledby="purchase-product">상품 구매</h2>
<form class="input-money-form" id="purchase-product-form">
  <label for="purchase-product-form">상품을 구매할 금액을 투입해주세요</label>
  <div>
    <input type="number" id="money-input" placeholder="금액" min="10" max="10000"/>
    <button type="submit" class="submit-button">충전</button>
  </div>
</form>
<p>투입한 금액: <span id="total-money">0</span>원</p>
</section>
<section class="table-section" title="상품 현황">
  <table id="product-status-table">
    <caption>
      구매가능 상품 현황
    </caption>
    <tr>
      <th>상품명</th>
      <th>가격</th>
      <th>수량</th>
      <th>관리</th>
    </tr>
</table>
</section>
  <section class="table-section" title="자판기 현황">
  <table id="coin-status-table">
    <caption>
      잔돈반환
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
  <button id="give-change-button">반환</button>
</section>`;
