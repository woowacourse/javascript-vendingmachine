export const manageProductTemplate = `
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
  <table id="product-status-table">
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
</section>`;

export const productTableRow = ({ name, price, stock, id }) => `
<tr>
  <td class="product-name">${name}</td>
  <td class="product-price">${price}</td>
  <td class="product-stock">${stock}</td>
  <td>
    <div class="table-button-wrapper">
      <button type="button" class="update-product-button" data-product-id=${id}>수정</button>
      <button type="button" class="remove-product-button" data-product-id=${id}>삭제</button>
    </div>
  </td>
</tr>
`;

export const updateProductTableRow = ({ name, price, stock, id }) => `
<tr>
  <td><input type="text" class="update-product-name-input" value="${name}" /></td>
  <td><input type="number" class="update-product-price-input" value="${price}" /></td>
  <td><input type="number" class="update-product-stock-input" value="${stock}" /></td>
  <td>
    <div class="table-button-wrapper">
      <button type="button" class="confirm-update-button" data-product-id=${id}>
      확인
      </button>
    </div>
  </td>
</tr>
`;
