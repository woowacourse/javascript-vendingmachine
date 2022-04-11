const purchaseTemplate = {
  inputCollection: () => `
    <label for="charge-money-input" class="label">상품을 구매할 금액을 투입해주세요.</label>
    <div class="primary-input-container">
      <input id="charge-money-input" class="input" type="number" placeholder="금액" required/>
      <button id="charge-money-button" class="primary-button">투입</button>
    </div>
    `,

  purchaseableProductsTable: () => `<h2>구매 가능 상품 현황</h2>
  <table>
  <colgroup>
    <col width="23%"></col>
    <col width="23%"></col>
    <col width="23%"></col>
    <col width="31%"></col>
  </colgroup>
  <thead>
    <tr>
      <th>상품명</th>
      <th>가격</th>
      <th>수량</th>
      <th></th>
    </tr>
  </thead>
  <tbody id="products-list">
  </tbody>
</table>
    `,

  product: ({ id, name, price, count }) => `
  <tr data-id=${id} data-name=${name} data-price=${price} data-count=${count}>
  <td>${name}</td>
  <td>${price}</td>
  <td>${count}</td>
  <td>
    <button class="purchase-button secondary-button">구매</button>
  </td>
</tr>
  `,
  changes: (coinStatus) => `
  <tr>
  <td>500원</td>
  <td>${coinStatus["500"]}</td>
</tr>
<tr>
  <td>100원</td>
  <td>${coinStatus["100"]}</td>
</tr>
<tr>
  <td>50원</td>
  <td>${coinStatus["50"]}</td>
</tr>
<tr>
  <td>10원</td>
  <td>${coinStatus["10"]}</td>
</tr>
  `,

  returnedChangesTable: () => `<h2>잔돈 반환</h2>
  <table>
  <thead>
    <tr>
      <th>동전</th>
      <th>개수</th>
    </tr>
  </thead>
  <tbody id="changes-list">
  </tbody>
</table>`,
};

export default purchaseTemplate;
