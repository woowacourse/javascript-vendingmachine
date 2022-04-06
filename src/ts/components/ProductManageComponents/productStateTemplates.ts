import {
  PRODUCT_NAME,
  PRODUCT_PRICE,
  PRODUCT_QUANTITY,
} from '../../constants/product';

export const generateTemplate = ({
  name: productName,
  price: productPrice,
  quantity: productQuantity,
}): string => `
  <tr class="product-table__info-tr" data-product-name="${productName}">
    <td class="product-table__product-name">${productName}</td>
    <td class="product-table__product-price">${productPrice}</td>
    <td><span class="product-table__product-quantity">${productQuantity}</span>개</td>
    <td class="product-table__button-wrapper flex-gap05">
      <button class="product-table__edit-button">수정</button>
      <button class="product-table__delete-button">삭제</button>
    </td>
    <td class="product-table__button-wrapper hide">
      <button class="product-table__confirm-button">확인</button>
    </td>
  </tr>
`;

export const generateEditTemplate = ({
  name: productName,
  price: productPrice,
  quantity: productQuantity,
}): string => `
  <tr class="product-table__info-tr" data-product-name="${productName}">
    <td><input type="text" name="product" class="product-table__input--edit product-table__product-name-input--edit" minlength="${PRODUCT_NAME.MIN_LENGTH}" maxlength="${PRODUCT_NAME.MAX_LENGTH}" value="${productName}" autofocus required /></td>
    <td><input type="number" class="product-table__input--edit product-table__product-price-input--edit" value="${productPrice}" step="${PRODUCT_PRICE.UNIT}" min="${PRODUCT_PRICE.MIN_PRICE}" max="${PRODUCT_PRICE.MAX_PRICE}" required /></td>
    <td><input type="number" class="product-table__input--edit product-table__product-quantity-input--edit" value="${productQuantity}" min="${PRODUCT_QUANTITY.MIN_QUANTITY}" max="${PRODUCT_QUANTITY.MAX_QUANTITY}" required /></td>
    <td class="product-table__button-wrapper hide">
      <button class="product-table__edit-button hide">수정</button>
    </td>
    <td class="product-table__button-wrapper">
      <button class="product-table__confirm-button" type="submit">확인</button>
    </td>
  </tr>
`;
