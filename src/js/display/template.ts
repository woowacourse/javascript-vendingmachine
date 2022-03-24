export const template = {
  productTableRowInners: ({ name, price, quantity }) => `
    <td>${name}</td>
    <td>${price}</td>
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
};
