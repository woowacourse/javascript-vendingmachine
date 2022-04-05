import { $ } from '../utils/dom';
import { Product } from '../declarations/resourceDeclaration';

export const drawProductList = function (parentNode = document) {
  const template = this.products
    .map(
      ({ name, price, quantity }: Product) =>
        `<tr class="product-info">
          <td class="product-info__text">${name}</td>
          <td class="product-info__text">${price}</td>
          <td class="product-info__text">${quantity}</td>
          <td class="product-info__input"><input type="text" minlength="1" maxlength="10" required="required" class="product-info-name" value="${name}" /></td>
          <td class="product-info__input"><input type="number" max="10000" min="100" required="required" class="product-info-price" value="${price}" /></td>
          <td class="product-info__input"><input type="number" max="20" min="1" required="required" class="product-info-quantity" value="${quantity}" /></td>
          <td>
            ${switchButtons(parentNode)}
          </td>
        </tr>`,
    )
    .join('');
  $('#product-list', parentNode).replaceChildren();
  $('#product-list', parentNode).insertAdjacentHTML('beforeend', template);
};

export const switchButtons = function (parentNode): string {
  if (parentNode === document) {
    return `
      <button class="modify-button button">수정</button>
      <button class="delete-button button">삭제</button>
      <button class="confirm-button button">확인</button>
    `;
  }
  return `<button class="buy-button button">구매</button>`;
};

export const drawCoins = function (): void {
  this.coins.forEach(({ amount, count }) => {
    $(`#coin-${amount}-count`, this.$buy).innerText = `${count}개`;
  });
};

export const drawTotalMoney = function (): void {
  $('.input-money-indicator').textContent = `투입한 금액: ${this.totalMoney}원`;
};
