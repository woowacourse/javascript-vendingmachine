import { SELECTOR } from '../../src/ts/constant/selector';

describe('상품 관리 탭 테스트', () => {
  const email = `${Math.random().toString(36).substring(3, 8)}@naaver.com`;
  const name = '김이박';
  const password = '1234!@#$asdf';
  const confirmPassword = '1234!@#$asdf';

  before(() => {
    cy.register(email, name, password, confirmPassword);
  });

  const itemName = '콜라';
  const itemPrice = 1000;
  const itemQuantity = 10;

  beforeEach(() => {
    cy.login(email, password);
    cy.get(SELECTOR.ITEM_MANAGE_TAB_BUTTON).click();
  });

  it('올바른 상품명, 가격, 수량을 입력하고 추가 버튼을 누르면 상품을 추가할 수 있다.', () => {
    cy.addItem(itemName, itemPrice, itemQuantity);

    cy.get(SELECTOR.TABLE_ROW).eq(1).should('have.attr', 'data-item-name', itemName);
  });

  it('추가한 상품에 수정 버튼을 누르면 상품 정보를 수정할 수 있다.', () => {
    cy.addItem(itemName, itemPrice, itemQuantity);

    cy.get(SELECTOR.EDIT_ITEM_BUTTON).click();
    cy.get(SELECTOR.ITEM_INFO_INPUT_CELL).eq(0).clear().type('사이다');
    cy.get(SELECTOR.CONFIRM_ITEM_BUTTON).click();

    cy.get(SELECTOR.TABLE_ROW).eq(1).should('have.attr', 'data-item-name', '사이다');
  });

  it('추가한 상품 수정 후, 취소 버튼을 누르면 변경 사항을 되돌릴 수 있다.', () => {
    cy.addItem(itemName, itemPrice, itemQuantity);

    cy.get(SELECTOR.EDIT_ITEM_BUTTON).click();
    cy.get(SELECTOR.ITEM_INFO_INPUT_CELL).eq(0).clear().type('사이다');
    cy.get(SELECTOR.CANCEL_ITEM_BUTTON).click();

    cy.get(SELECTOR.TABLE_ROW).eq(1).should('have.attr', 'data-item-name', itemName);
  });

  it('추가한 상품에 삭제 버튼을 누르면 상품을 삭제할 수 있다.', () => {
    cy.addItem(itemName, itemPrice, itemQuantity);

    cy.get(SELECTOR.DELETE_ITEM_BUTTON).click();

    cy.get(SELECTOR.TABLE_ROW).should('have.length', 1);
  });
});
