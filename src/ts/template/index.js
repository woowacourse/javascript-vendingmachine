export const itemManageTabContentTemplate = `
    <form id="item-info-form" class="input-form">
      <label>추가할 상품 정보를 입력해주세요.</label>
      <div class="input-form-container">
        <input class="item-info-input" type="text" placeholder="상품명" minlength="1" maxlength="10"/>
        <input class="item-info-input" type="number" placeholder="가격" min="100" max="10000" step="10"/>
        <input class="item-info-input" type="number" placeholder="수량" min="1" max="20"/>
        <button class="input-form-button">추가</button>
      </div>
    </form>
    <table class="item-status-table">
      <caption><h2>상품 현황</h2></caption>
      <tr>
        <th>상품명</th>
        <th>가격</th>
        <th>수량</th>
        <th></th>
      </tr>
    </table>
`;

export const generateItemManageTableRowTemplate = ({ itemName, itemPrice, itemQuantity }) => `
    <tr>
      <td>${itemName}</td>
      <td>${itemPrice}</td>
      <td>${itemQuantity}</td>
      <td>
        <div>
          <button type="button" id="edit-item-button" class="default-button">수정</button>
          <button type="button" id="delete-item-button" class="default-button">삭제</button>
        </div>
      </td>
    </tr>
`;
