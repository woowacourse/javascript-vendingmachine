export const productTabTemplate = /* html */ `
<section class="form-section" aria-labelledby="product-tab-title">
  <h2 class="tab-title" id="product-tab-title">상품 추가하기</h2>
  <form id="add-product-form">
    <div class="instructions">
      <h3>🛒상품 추가 시 유의 사항</h3>
      <ul class="instructions-list">
        <li>상품명: 1자 이상 10자 이하</li>
        <li>가격: 100원 이상 10000원 이하, 10원 단위</li>
        <li>수량: 1개 이상 20개 이하</li>
      </ul>
    </div>
    <fieldset>
      <legend>추가할 상품 정보를 입력해주세요.</legend>
      <div class="input-wrapper">
        <label for="name">상품명
        <input type="text" name="name" id="product-name-input" placeholder="상품명" required/>
        </label>
      </div>
      <div class="input-wrapper">
        <label for="price">상품 가격</label>
        <input type="number" name="price" id="product-price-input" placeholder="가격" min="100" max="10000" required/>
      </div>
      <div class="input-wrapper">
        <label for="stock">상품 수량</label>
        <input type="number" name="stock" id="product-stock-input" placeholder="수량" min="1" max="20" required/>
      </div>
      <button type="submit" class="submit-button">추가</button>
    </fieldset>
  </form>
</section>
<table class="product-status-table">
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
`;

export const productTableRowTemplate = ({ name, price, stock, id }) => /* html */ `
<tr class="product-table-row">
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

export const productUpdateTableRowTemplate = ({ name, price, stock, id }) => /* html */ `
<tr>
  <td>
    <input type="text" class="update-product-name-input" value="${name}" />
  </td>
  <td>
    <input type="number" class="update-product-price-input" value="${price}" />
  </td>
  <td>
    <input type="number" class="update-product-stock-input" value="${stock}" />
  </td>
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
`;
