import { IAddProductEvent, IUpdateProductEvent } from "../type";

const productTemplate = {
  input: () => `
    <label for="product-name-input" class="label">추가할 상품 정보를 입력해주세요.</label>
    <div class="primary-input-container">
      <input id="product-name-input" class="input" placeholder="상품명" required/>
      <input id="product-price-input" class="input" placeholder="가격" type="number" required/>
      <input id="product-count-input" class="input" placeholder="수량" type="number" required/>
      <button id="add-product-button" class="primary-button">추가</button>
    </div>
  `,

  productTable: () => `<h2>상품 현황</h2>
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

  product: ({ id, name, price, count }: IUpdateProductEvent) => `
  <tr data-id=${id} data-name=${name} data-price=${price} data-count=${count}>
  <td>${name}</td>
  <td>${price}</td>
  <td>${count}</td>
  <td>
    <button class="edit-button process-button">수정</button>
    <button class="delete-button process-button">삭제</button>
  </td>
</tr>
  `,

  updatedProduct: ({ name, price, count }: IAddProductEvent) =>
    `<td>${name}</td>
  <td>${price}</td>
  <td>${count}</td>
  <td>
    <button class="edit-button process-button">수정</button>
    <button class="delete-button process-button">삭제</button>
  </td>`,

  productUpdateForm: ({ name, price, count }: IAddProductEvent) => `
    <td><input id="edit-name-input" class="product-edit-input input" value='${name}' /></td>
    <td><input id="edit-price-input" class="product-edit-input input" value='${price}' type="number"/></td>
    <td><input id="edit-count-input" class="product-edit-input input" value='${count}' type="number"/></td>
    <td>
      <button class="save-button process-button">확인</button>
    </td>
  `,
};

export default productTemplate;
