const sharedTemplate = {
  addInputContainer() {
    return `
      <section class="input-container">
      <h2 hidden>상품 정보 입력</h2>
      <form>
        <label>추가할 상품 정보를 입력해주세요.</label>
        <div>
          <input class="add-item-input" placeholder="상품명" />
          <input class="add-item-input" placeholder="가격" />
          <input class="add-item-input" placeholder="수량" />
          <button class="submit-button">추가</button>
        </div>
      </form>
      </section>
    `;
  },
  tableContainer(items) {
    return `
    <section class="table-container">
          <h2>상품 현황</h2>
          <table class="item-table">
          <tr>
          <th>상품명</th>
          <th>가격</th>
          <th>수량</th>
          <th></th>
        </tr>
          ${items
            .map(item => {
              return `
            <tr>
              <td>${item.name}</td>
              <td>${item.price}</td>
              <td>${item.quantity}</td>
              <td>
                <button class="item-table-change-button">수정</button>
                <button class="item-table-delete-button">삭제</button>
              </td>
            </tr>`;
            })
            .join()}
          </table>
        </section>
    `;
  },
};

export const itemMangeTemplate = {
  pageTemplate(item) {
    return `
      ${sharedTemplate.addInputContainer()}
      ${sharedTemplate.tableContainer(item)}
    `;
  },
};

const itemPurchaseTemplate = {};

const MoneyChargeTemplate = {};
