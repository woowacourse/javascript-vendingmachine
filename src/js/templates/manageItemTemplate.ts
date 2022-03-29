import { TemplateType, ItemType } from '../types/types';

export const sectionTemplate = {
  inputContainer(): TemplateType {
    return `
      <section class="input-container">
      <h2 hidden>상품 정보 입력</h2>
      <form id="add-item-form">
        <label>추가할 상품 정보를 입력해주세요.</label>
        <div>
          <input id="add-item-name" class="add-item-input" placeholder="상품명" />
          <input id="add-item-price" class="add-item-input" placeholder="가격" type="number"/>
          <input id="add-item-quantity" class="add-item-input" placeholder="수량" type="number"/>
          <button class="submit-button">추가</button>
        </div>
      </form>
      </section>
    `;
  },

  tableContainer(items: ItemType[]): TemplateType {
    return `
    <section class="table-container">
      <h2>상품 현황</h2>
      <table class="item-table">
        <tbody class="item-table-body">
        <tr>
          <th>상품명</th>
          <th>가격</th>
          <th>수량</th>
          <th></th>
        </tr>
         ${items.map(item => this.normalTableRow(item)).join('')}
         </tbody>
      </table>
    </section>
    `;
  },

  normalTableRow(item: ItemType): TemplateType {
    return `
    <tr>
      <td class="table-item-name">${item.name}</td>
      <td class="table-item-price">${item.price}</td>
      <td class="table-item-quantity">${item.quantity}</td>
      <td class="item-table-button-container">
        <button class="item-table-change-button">수정</button>
        <button class="item-table-delete-button">삭제</button>
      </td>
    </tr>
    `;
  },

  changeTableRow(item: ItemType) {
    return `
    <tr>
      <td><input class="table-item-input table-item-input-name" value="${item.name}" placeholder="상품명"></input></td>
      <td><input class="table-item-input table-item-input-price" value="${item.price}" placeholder="가격" type="number"></input></td>
      <td><input class="table-item-input table-item-input-quantity" value="${item.quantity}" placeholder="수량" type="number"></input></td>
      <td>
       <button class="item-table-confirm-button">확인</button>
      </td>
    </tr>
`;
  },
};

export const manageItemTemplate = (items: ItemType[]): TemplateType => `
  ${sectionTemplate.inputContainer()}
  ${sectionTemplate.tableContainer(items)}
`;
