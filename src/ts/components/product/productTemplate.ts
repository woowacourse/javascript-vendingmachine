import { ProductProps } from "../../utils/interface";

const productTemplate = `
  <section id="product-control-section">
    <div>
      <form id="product-control-form">
        <label>추가할 상품 정보를 입력해주세요.</label>
          <div>
            <input placeholder="상품명" class="product-control-input" />
            <input type="number" placeholder="가격" class="product-control-input" />
            <input type="number" placeholder="수량" class="product-control-input" />
            <button type="submit" id="product-add-button">추가</button>
          </div>
      </form>  
    </div>
    <div>
      <h1 id="product-table-title">상품 현황</h1>
      <table id="product-control-table">
        <tr>
          <th>상품명</th>
          <th>가격</th>
          <th>수량</th>
          <th></th>
        </tr>
      </table>
    </div>
  </section>`;

const addProductTemplate = ({
  productName,
  productPrice,
  productQuantity
}: ProductProps) => {
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

const editProductTemplate = ({
  productName,
  productPrice,
  productQuantity
}: ProductProps) => {
  return `
    <td class="product-name" data-name="${productName}" ><input class="product-edit-input" value="${productName}" /></td>
    <td><input class="product-edit-input" value='${productPrice}' /></td>
    <td><input class="product-edit-input" value='${productQuantity}' /></td>
    <td><button type="button" class="product-confirm-button">확인</button></td>
  `;
};

export { productTemplate, addProductTemplate, editProductTemplate };
