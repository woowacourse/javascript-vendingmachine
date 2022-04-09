import { SELECTOR, SELECTOR_NAME } from '../../src/ts/constant/selector';

describe('상품 추가 테스트', () => {
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

  it('이미 등록된 상품을 추가하려는 경우, 경고창이 뜬다.', () => {
    cy.addItem(itemName, itemPrice, itemQuantity);
    cy.addItem(itemName, itemPrice, itemQuantity);

    cy.checkSnackbarVisibility();
  });

  it('100원 미만의 가격을 입력하고 추가 버튼을 누르면, 경고창이 뜬다.', () => {
    const itemPrice = 99;
    cy.addItem(itemName, itemPrice, itemQuantity);

    cy.checkInvalidInput(1);
  });

  it('10000원을 초과한 가격을 입력하고 추가 버튼을 누르면, 경고창이 뜬다.', () => {
    const itemPrice = 10001;
    cy.addItem(itemName, itemPrice, itemQuantity);

    cy.checkInvalidInput(1);
  });

  it('10원으로 나누어 떨어지지 않는 가격을 입력하고 추가 버튼을 누르면, 경고창이 뜬다.', () => {
    const itemPrice = 9999;
    cy.addItem(itemName, itemPrice, itemQuantity);

    cy.checkInvalidInput(1);
  });

  it('20개를 초과한 수량을 입력하고 추가 버튼을 누르면, 경고창이 뜬다.', () => {
    const itemQuantity = 21;
    cy.addItem(itemName, itemPrice, itemQuantity);

    cy.checkInvalidInput(1);
  });
});

describe('등록한 상품 수정 테스트', () => {
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

  it('추가한 상품의 수정 버튼을 누르면, 상품 정보를 수정하고 확인 버튼을 눌러 정보를 변경할 수 있다.', () => {
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
