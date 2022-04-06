import { Product } from "../../mananger/ProductManager";
import { PRODUCT } from "../../utils/constants";

const productTemplate = () => {
  return `
  <section>
    <form class="product-manange__form">
      <label>추가할 상품 정보를 입력해주세요.</label>
        <div>
          <input placeholder="상품명" class="product-manange__name-input product-input" />
          <input type="number" placeholder="가격" class="product-manange__price-input product-input" 
          min=${PRODUCT.MIN_PRICE} max=${PRODUCT.MAX_PRICE} step=${PRODUCT.UNIT} />
          <input type="number" placeholder="수량" class="product-manange__quantity-input product-input" />
          <button type="submit" class="product-manange__add-button">추가</button>
        </div>
    </form>  
  </section>
  <section>
    <h1 class="product-manange__title">상품 현황</h1>
    <div class="product-manage__table-container">
    <table class="product-manange__table">
      <thead>
      <tr>
        <th>상품명</th>
        <th>가격</th>
        <th>수량</th>
        <th></th>
      </tr>
      </thead>
      <tbody class="productmanage__table-body">
      </tbody>
    </table>
    </div>
  </section>`;
};

const productRowTemplate = ({ name, price, quantity }) => {
  return `
  <tr data-name=${name}>
    <td>${name}</td>
    <td>${price}</td>
    <td>${quantity}</td>
    <td>
      <button type="button" class="product-manage__edit-button product-manage__option">수정</button>
      <button type="button" class="product-manage__remove-button product-manage__option">제거</button>
    </td>
  </tr>`;
};

const productManangeListTemplate = (list: Product[]) => {
  return `
  ${list.map(({ name, price, quantity }) => `${productRowTemplate({ name, price, quantity })}`).join("")}
  `;
};

const editProductTemplate = ({ name, price, quantity }) => {
  return `
  <tr data-name=${name}>
    <td><input class="product-manage__edit-input--name edit-input" value='${name}' /></td>
    <td><input class="product-manage__edit-input--price edit-input" value='${price}' 
      min=${PRODUCT.MIN_PRICE} max=${PRODUCT.MAX_PRICE} step=${PRODUCT.UNIT} type="number" /></td>
    <td><input class="product-manage__edit-input--quantity edit-input" value='${quantity}'type="number" /></td>
    <td><button type="button" class="product-manage__confirm-button product-manage__option">확인</button></td>
  </tr>
  `;
};

export { productTemplate, productRowTemplate, productManangeListTemplate, editProductTemplate };
