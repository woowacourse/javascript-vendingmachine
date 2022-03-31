import { ITEM_ERROR_MESSAGE } from '../../src/ts/constant/errorMessage';

describe('상품 수정 테스트', () => {
  const itemName = '콜라';
  const itemPrice = 1000;
  const itemQuantity = 10;

  beforeEach(() => {
    cy.visit('/#item-manage');

    cy.addItem(itemName, itemPrice, itemQuantity);
  });

  it('추가한 상품의 이름을 올바른 이름으로 수정하고 수정 버튼을 누르면 상품 정보를 수정할 수 있다.', () => {
    const editedItemName = '사이다';

    cy.get('.edit-item-button').click();
    cy.get('.item-info-input-cell').eq(0).clear().type(editedItemName);
    cy.get('.confirm-item-button').click();

    cy.get('tr').eq(1).should('have.attr', 'data-item-name', editedItemName);
  });

  it('추가한 상품의 이름을 지우고 수정 버튼을 누르면 경고창이 보이며 상품 정보를 수정할 수 없다.', () => {
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    cy.get('.edit-item-button').click();
    cy.get('.item-info-input-cell').eq(0).clear();
    cy.get('.confirm-item-button')
      .click()
      .then(() => {
        expect(alertStub).to.be.calledWith(ITEM_ERROR_MESSAGE.BLANK_NOT_ALLOWED);
      });
  });

  it('추가한 상품의 이름을 공백으로 입력하고 수정 버튼을 누르면 경고창이 보이며 상품 정보를 수정할 수 없다.', () => {
    const editedItemName = ' ';

    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    cy.get('.edit-item-button').click();
    cy.get('.item-info-input-cell').eq(0).clear().type(editedItemName);
    cy.get('.confirm-item-button')
      .click()
      .then(() => {
        expect(alertStub).to.be.calledWith(ITEM_ERROR_MESSAGE.BLANK_NOT_ALLOWED);
      });
  });

  it('추가한 상품의 이름을 이미 존재하는 다른 상품의 이름으로 수정하고 수정 버튼을 누르면 경고창이 보이며 상품 정보를 수정할 수 없다.', () => {
    const secondItemName = '사이다';
    const secondItemPrice = 2000;
    const secondItemQuantity = 20;

    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    cy.addItem(secondItemName, secondItemPrice, secondItemQuantity);

    cy.get('.edit-item-button').eq(1).click();

    cy.get('.item-info-input-cell').eq(3).clear().type(itemName);

    cy.get('.confirm-item-button')
      .eq(1)
      .click()
      .then(() => {
        expect(alertStub).to.be.calledWith(ITEM_ERROR_MESSAGE.ALREADY_EXIST);
      });
  });

  it('추가한 상품의 가격을 올바른 가격으로 수정하고 수정 버튼을 누르면 상품 정보를 수정할 수 있다.', () => {
    const editedItemPrice = 2000;

    cy.get('.edit-item-button').click();
    cy.get('.item-info-input-cell').eq(1).clear().type(editedItemPrice);
    cy.get('.confirm-item-button').click();

    cy.get('.item-info-input-cell').eq(1).should('have.value', editedItemPrice);
  });

  it('추가한 상품의 가격이 100원보다 작으면 수정 버튼을 눌러도 상품 정보를 수정할 수 없다.', () => {
    const editedItemPrice = 90;
    const expectedInvalidInputCount = 1;

    cy.get('.edit-item-button').click();
    cy.get('.item-info-input-cell').eq(1).clear().type(editedItemPrice);
    cy.get('.confirm-item-button').click();

    cy.checkInvalidInputCount(expectedInvalidInputCount);
  });

  it('추가한 상품의 가격이 10,000원보다 크면 수정 버튼을 눌러도 상품 정보를 수정할 수 없다.', () => {
    const editedItemPrice = 10010;
    const expectedInvalidInputCount = 1;

    cy.get('.edit-item-button').click();
    cy.get('.item-info-input-cell').eq(1).clear().type(editedItemPrice);
    cy.get('.confirm-item-button').click();

    cy.checkInvalidInputCount(expectedInvalidInputCount);
  });

  it('추가된 상품 가격이 10원으로 나누어떨어지지 않으면 수정 버튼을 눌러도 상품 정보를 수정할 수 없다.', () => {
    const editedItemPrice = 101;
    const expectedInvalidInputCount = 1;

    cy.get('.edit-item-button').click();
    cy.get('.item-info-input-cell').eq(1).clear().type(editedItemPrice);
    cy.get('.confirm-item-button').click();

    cy.checkInvalidInputCount(expectedInvalidInputCount);
  });

  it('추가한 상품의 수량을 올바른 수량으로 수정하고 수정 버튼을 누르면 상품 정보를 수정할 수 있다.', () => {
    const editedItemQuantity = 10;

    cy.get('.edit-item-button').click();
    cy.get('.item-info-input-cell').eq(2).clear().type(editedItemQuantity);
    cy.get('.confirm-item-button').click();

    cy.get('.item-info-input-cell').eq(2).should('have.value', editedItemQuantity);
  });

  it('추가된 상품의 수량이 1개보다 작으면 수정 버튼을 눌러도 상품 정보를 수정할 수 없다.', () => {
    const editedItemQuantity = 0;
    const expectedInvalidInputCount = 1;

    cy.get('.edit-item-button').click();
    cy.get('.item-info-input-cell').eq(2).clear().type(editedItemQuantity);
    cy.get('.confirm-item-button').click();

    cy.checkInvalidInputCount(expectedInvalidInputCount);
  });

  it('추가된 상품의 수량이 20개보다 크면 수정 버튼을 눌러도 상품 정보를 수정할 수 없다.', () => {
    const editedItemQuantity = 21;
    const expectedInvalidInputCount = 1;

    cy.get('.edit-item-button').click();
    cy.get('.item-info-input-cell').eq(2).clear().type(editedItemQuantity);
    cy.get('.confirm-item-button').click();

    cy.checkInvalidInputCount(expectedInvalidInputCount);
  });

  it('추가된 상품의 수량이 1개로 나누어떨어지지 않으면 수정 버튼을 눌러도 상품 정보를 수정할 수 없다.', () => {
    const editedItemQuantity = 10.5;
    const expectedInvalidInputCount = 1;

    cy.get('.edit-item-button').click();
    cy.get('.item-info-input-cell').eq(2).clear().type(editedItemQuantity);
    cy.get('.confirm-item-button').click();

    cy.checkInvalidInputCount(expectedInvalidInputCount);
  });
});
