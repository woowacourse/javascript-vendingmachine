import { PURCAHSE } from "../../utils/constants";
import { Product } from "../../mananger/ProductManager";

const purchaseTemplate = () => {
  return `
  <section>
    <form class="purchase-form">
      <label>상품을 구매할 금액을 투입해주세요.</label>
        <div>
          <input type="number" placeholder="금액" class="purchase-form__input" max=${PURCAHSE.MAX_AMOUNT} step=${PURCAHSE.UNIT} />
          <button type="submit" class="purchase-form__add-button">투입</button>
        </div>
    </form>  
    <p>투입한 금액: <span class="purchase-form__amount">0</span>원</p>
  </section> 
  <section>
    <h1 class="purchase-table__title">구매 가능한 상품 현황</h1>
    <div class="purchase-table__container">
    <table class="purchase-table">
      <thead>
        <tr>
          <th>상품명</th>
          <th>가격</th>
          <th>수량</th>
          <th>구매</th>
        </tr>
      </thead>
      <tbody class="purchase-table__body">
      </tbody>
    </table>
    </div>
  </section>
  `;
};

const productListTemplate = (list: Product[]) => {
  return `
  ${list
    .map(
      ({ name, price, quantity }) =>
        `<tr data-name=${name}>
        <td>${name}</td>
        <td>${price}</td>
        <td>${quantity}</td>
        <td>
          <button type="button" class="purchase-table__purchase-button">구매</button>
        </td>
      </tr>`,
    )
    .join("")}
  `;
};

export { purchaseTemplate, productListTemplate };
