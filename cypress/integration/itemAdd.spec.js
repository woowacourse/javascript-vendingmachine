import { ITEM_ERROR_MESSAGE } from '../../src/ts/constant/errorMessage';

describe('상품 추가 테스트', () => {
  const itemName = '콜라';
  const itemPrice = 1000;
  const itemQuantity = 10;

  beforeEach(() => {
    cy.visit('/#item-manage');
  });

  it('올바른 상품명, 가격, 수량을 입력하고 추가 버튼을 누르면 상품을 추가할 수 있다.', () => {
    cy.addItem(itemName, itemPrice, itemQuantity);

    cy.checkAddedItem(itemName);
  });

  it('상품명을 입력하지 않고 추가 버튼을 누르면 경고창이 보이며 상품이 추가되지 않는다.', () => {
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    cy.get('.item-info-input').eq(1).type(itemPrice);
    cy.get('.item-info-input').eq(2).type(itemQuantity);
    cy.get('.input-form-button')
      .click()
      .then(() => {
        expect(alertStub).to.be.calledWith(ITEM_ERROR_MESSAGE.BLANK_NOT_ALLOWED);
      });
    cy.checkItemNotAdded();
  });

  it('상품명에 공백을 입력하고 추가 버튼을 누르면 경고창이 보이며 상품이 추가되지 않는다.', () => {
    const invalidItemName = ' ';

    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    cy.addItem(invalidItemName, itemPrice, itemQuantity).then(() => {
      expect(alertStub).to.be.calledWith(ITEM_ERROR_MESSAGE.BLANK_NOT_ALLOWED);
    });
    cy.checkItemNotAdded();
  });

  it('상품 현황에 이미 존재하는 같은 이름의 상품을 입력하고 추가 버튼을 누르면 경고창이 보이며 상품이 추가되지 않는다.', () => {
    const newItemPrice = 2000;
    const newItemQuantity = 15;

    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    cy.addItem(itemName, itemPrice, itemQuantity);
    cy.addItem(itemName, newItemPrice, newItemQuantity).then(() => {
      expect(alertStub).to.be.calledWith(ITEM_ERROR_MESSAGE.ALREADY_EXIST);
    });
  });

  it('상품 가격이 100원보다 작으면 추가 버튼을 눌러도 상품이 추가되지 않는다.', () => {
    const invalidItemPrice = 90;
    const expectedInvalidInputCount = 1;

    cy.addItem(itemName, invalidItemPrice, itemQuantity);

    cy.checkInvalidInputCount(expectedInvalidInputCount);
    cy.checkItemNotAdded();
  });

  it('상품 가격이 10,000원보다 크면 추가 버튼을 눌러도 상품이 추가되지 않는다.', () => {
    const invalidItemPrice = 10010;
    const expectedInvalidInputCount = 1;

    cy.addItem(itemName, invalidItemPrice, itemQuantity);

    cy.checkInvalidInputCount(expectedInvalidInputCount);
    cy.checkItemNotAdded();
  });

  it('상품 가격이 10원으로 나누어떨어지지 않으면 추가 버튼을 눌러도 상품이 추가되지 않는다.', () => {
    const invalidItemPrice = 101;
    const expectedInvalidInputCount = 1;

    cy.addItem(itemName, invalidItemPrice, itemQuantity);

    cy.checkInvalidInputCount(expectedInvalidInputCount);
    cy.checkItemNotAdded();
  });

  it('상품수량이 1개보다 작으면 추가 버튼을 눌러도 상품이 추가되지 않는다.', () => {
    const invalidItemQuantity = 0;
    const expectedInvalidInputCount = 1;

    cy.addItem(itemName, itemPrice, invalidItemQuantity);

    cy.checkInvalidInputCount(expectedInvalidInputCount);
    cy.checkItemNotAdded();
  });

  it('상품수량이 20개보다 크면 추가 버튼을 눌러도 상품이 추가되지 않는다.', () => {
    const invalidItemQuantity = 21;
    const expectedInvalidInputCount = 1;

    cy.addItem(itemName, itemPrice, invalidItemQuantity);

    cy.checkInvalidInputCount(expectedInvalidInputCount);
    cy.checkItemNotAdded();
  });

  it('상품수량이 1개로 나누어떨어지지 않으면 추가 버튼을 눌러도 상품이 추가되지 않는다.', () => {
    const invalidItemQuantity = 10.5;
    const expectedInvalidInputCount = 1;

    cy.addItem(itemName, itemPrice, invalidItemQuantity);

    cy.checkInvalidInputCount(expectedInvalidInputCount);
    cy.checkItemNotAdded();
  });
});
