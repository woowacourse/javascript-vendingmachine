Cypress.Commands.add('addItem', (itemName, itemPrice, itemQuantity) => {
  cy.get('.item-info-input').eq(0).type(itemName);
  cy.get('.item-info-input').eq(1).type(itemPrice);
  cy.get('.item-info-input').eq(2).type(itemQuantity);
  cy.get('.input-form-button').click();
});

describe('상품 관리 탭 테스트', () => {
  const itemName = '콜라';
  const itemPrice = 1000;
  const itemQuantity = 10;

  beforeEach(() => {
    cy.visit('/#item-manage');
  });

  it('올바른 상품명, 가격, 수량을 입력하고 추가 버튼을 누르면 상품을 추가할 수 있다.', () => {
    cy.addItem(itemName, itemPrice, itemQuantity);

    cy.get('tr').eq(1).should('have.attr', 'data-item-name', itemName);
  });

  it('추가한 상품에 수정 버튼을 누르면 상품 정보를 수정할 수 있다.', () => {
    cy.addItem(itemName, itemPrice, itemQuantity);

    cy.get('.edit-item-button').click();
    cy.get('.item-info-input-cell').eq(0).type('코카');
    cy.get('.confirm-item-button').click();

    cy.get('tr').eq(1).should('have.attr', 'data-item-name', '코카콜라');
  });

  it('추가한 상품에 삭제 버튼을 누르면 상품을 삭제할 수 있다.', () => {
    cy.addItem(itemName, itemPrice, itemQuantity);

    cy.get('.delete-item-button').click();

    cy.get('tr').should('have.length', 1);
  });
});
