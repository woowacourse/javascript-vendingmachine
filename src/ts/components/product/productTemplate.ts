const productTemplate = () => {
  return `
  <div>
    <form class="product-manange__form">
      <label>추가할 상품 정보를 입력해주세요.</label>
        <div>
          <input placeholder="상품명" class="product-manange__name-input product-input" />
          <input type="number" placeholder="가격" class="product-manange__price-input product-input" />
          <input type="number" placeholder="수량" class="product-manange__quantity-input product-input" />
          <button type="submit" class="product-manange__add-button">추가</button>
        </div>
    </form>  
  </div>
  <div>
    <h1 class="product-manange__title">상품 현황</h1>
    <table class="product-manange__table">
      <tr>
        <th>상품명</th>
        <th>가격</th>
        <th>수량</th>
        <th></th>
      </tr>
    </table>
  </div>`;
};

const addProductTemplate = (productName: string, productPrice: number, productQuantity: number) => {
  return `
   <tr>
      <td class="product-name">${productName}</td>
      <td>${productPrice}</td>
      <td>${productQuantity}</td>
      <td>
        <button type="button" class="product-edit-button">수정</button>
        <button type="button" class="product-remove-button">제거</button>
      </td>
  </tr>`;
};

const editProductTemplate = (productName: string, productPrice: number, productQuantity: number) => {
  return `
    <td class="product-name"><input class="product-edit-input" value='${productName}' /></td>
    <td><input class="product-edit-input" value='${productPrice}' /></td>
    <td><input class="product-edit-input" value='${productQuantity}' /></td>
    <td><button type="button" class="product-confirm-button">확인</button></td>
  `;
};

export { productTemplate, addProductTemplate, editProductTemplate };
