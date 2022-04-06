describe('상품 관리 탭 테스트', () => {
  const itemName = '콜라';
  const itemPrice = 1000;
  const itemQuantity = 10;

  beforeEach(() => {
    cy.login('a@naaver.com', '1234!@#$asdf');
    cy.get('#item-manage-tab-button').click();
  });

  it('올바른 상품명, 가격, 수량을 입력하고 추가 버튼을 누르면 상품을 추가할 수 있다.', () => {
    cy.addItem(itemName, itemPrice, itemQuantity);

    cy.get('tr').eq(1).should('have.attr', 'data-item-name', itemName);
  });

  it('추가한 상품에 수정 버튼을 누르면 상품 정보를 수정할 수 있다.', () => {
    cy.addItem(itemName, itemPrice, itemQuantity);

    cy.get('.edit-item-button').click();
    cy.get('.item-info-input-cell').eq(0).clear().type('사이다');
    cy.get('.confirm-item-button').click();

    cy.get('tr').eq(1).should('have.attr', 'data-item-name', '사이다');
  });

  it('추가한 상품 수정 후, 취소 버튼을 누르면 변경 사항을 되돌릴 수 있다.', () => {
    cy.addItem(itemName, itemPrice, itemQuantity);

    cy.get('.edit-item-button').click();
    cy.get('.item-info-input-cell').eq(0).clear().type('사이다');
    cy.get('.cancel-item-button').click();

    cy.get('tr').eq(1).should('have.attr', 'data-item-name', itemName);
  });

  it('추가한 상품에 삭제 버튼을 누르면 상품을 삭제할 수 있다.', () => {
    cy.addItem(itemName, itemPrice, itemQuantity);

    cy.get('.delete-item-button').click();

    cy.get('tr').should('have.length', 1);
  });
});
