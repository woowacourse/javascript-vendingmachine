export const generateItemManageTabContentTemplate = (itemList) => `
    <form id="item-info-form" class="input-form">
      <label>추가할 상품 정보를 입력해주세요.</label>
      <div class="input-form-container">
        <input class="item-info-input" type="text" placeholder="상품명" minlength="1" maxlength="10" autofocus/>
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
      ${itemList.map((itemInfo) => generateItemManageTableRowTemplate(itemInfo)).join('')}
    </table>
`;

export const generateItemManageTableRowTemplate = ({ itemName, itemPrice, itemQuantity }) => `
    <tr data-item-name="${itemName}">
      <td><input class="item-info-input-cell" value="${itemName}" type="text" minlength="1" maxlength="10" disabled/></td>
      <td><input class="item-info-input-cell" value="${itemPrice}" type="number" min="100" max="10000" step="10" disabled/></td>
      <td><input class="item-info-input-cell" value="${itemQuantity}" type="number" min="1" max="20" disabled/></td>
      <td class="item-button-cell">
        <div>
          <button type="button" class="default-button edit-item-button">수정</button>
          <button type="button" class="default-button delete-item-button">삭제</button>
        </div>
      </td>
      <td class="item-button-cell hide">
        <button type="button" class="default-button confirm-item-button">확인</button>
      </td>
    </tr>
`;

export const generateCoinRechargeTabContentTemplate = (chargedAmount, coinCollection) => `
    <form id="cash-charge-form" class="input-form">
        <label>자판기가 보유할 금액을 입력해주세요</label>
        <div class="input-form-container">
          <input class="cash-charge-input" type="number" placeholder="금액" min="10" max="100000" step="10" autofocus/>
          <button class="input-form-button">충전</button>
        </div>
    </form>
    <p class="vendingmachine-total-amount">현재 보유 금액: <span id="charged-amount">${chargedAmount}</span>원</p>
    <table class="vendingmachine-coin-table">
      <caption><h2>자판기가 보유한 동전</h2></caption>
      <tr>
        <th>동전</th>
        <th>개수</th>
      </tr>
      <tr>
        <td>500원</td>
        <td class="coin-count" data-coin-value="500">${coinCollection[500]}개</td>
      </tr>
      <tr>
        <td>100원</td>
        <td class="coin-count" data-coin-value="100">${coinCollection[100]}개</td>
      </tr>
      <tr>
        <td>50원</td>
        <td class="coin-count" data-coin-value="50">${coinCollection[50]}개</td>
      </tr>
      <tr>
        <td>10원</td>
        <td class="coin-count" data-coin-value="10">${coinCollection[10]}개</td>
      </tr>
    </table>
`;

export const generateComfirmMessage = (itemName) => `정말 '${itemName}' 상품을 삭제하시겠습니까?`;
