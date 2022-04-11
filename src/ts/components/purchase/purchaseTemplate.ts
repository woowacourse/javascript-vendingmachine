import { ProductProps } from "../../utils/interface";

const purchaseTemplate = `
  <section id="purchase-product-section">
    <div id="insert-money-form-wrap">
      <form id="insert-money-form">
        <label>상품을 구매할 금액을 투입해주세요</label>
        <div>
          <input type="number" placeholder="금액" class="insert-money-input" />
          <button type="submit" id="insert-money-button">투입</button>
        </div>
      </form>
      <p>투입한 금액 : <span id="insert-money-text">0</span>원</p></div>
    </div>
      <h1 id="purchase-product-table-title">구매 가능 상품 현황</h1>
      <table id="purchase-possible-product-table">
        <tr> 
          <th>상품명</th>
          <th>가격</th>
          <th>수량</th>
          <th>구매</th>
        </tr>
      </table>
    </div>
    <div>
      <h1 id="return-charge-table-title">잔돈 반환</h1>
      <table id="return-charge-table">
        <tr> 
          <th>동전</th>
          <th>개수</th>
        </tr>
        <tr>
          <td>500원</td>
          <td class="return-coin-count">0개</td>
        </tr>
        <tr>
          <td>100원</td>
          <td class="return-coin-count">0개</td>
        </tr>
        <tr>
          <td>50원</td>
          <td class="return-coin-count">0개</td>
        </tr>
        <tr>
          <td>10원</td>
          <td class="return-coin-count">0개</td>
        </tr>
      </table>
    </div>
    <div id="return-money-button-wrap">
      <button type="button" id="return-money-button">반환</button>
    </div>
  </section>`;

const purchasePossibleProductTemplate = ({ productName, productPrice, productQuantity }: ProductProps) => {
  return `
    <tr>
      <td class="product-name">${productName}</td>
      <td>${productPrice}</td>
      <td>${productQuantity}</td>
      <td>
        <button type="button" class="product-purchase-button">구매</button>
      </td>
    </tr>`;
};

export { purchaseTemplate, purchasePossibleProductTemplate };