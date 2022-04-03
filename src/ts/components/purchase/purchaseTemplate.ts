import { PURCAHSE } from "../../utils/constants";

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
  `;
};

export { purchaseTemplate };
