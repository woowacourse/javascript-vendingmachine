describe('상품 수정 테스트', () => {
  const itemName = '콜라';
  const itemPrice = 1000;
  const itemQuantity = 10;

  beforeEach(() => {
    cy.visit('/#item-manage');
  });

  it('추가한 상품에 수정 버튼을 누르면 상품 정보를 수정할 수 있다.', () => {
    cy.addItem(itemName, itemPrice, itemQuantity);

    cy.get('.edit-item-button').click();
    cy.get('.item-info-input-cell').eq(0).clear().type('사이다');
    cy.get('.confirm-item-button').click();

    cy.get('tr').eq(1).should('have.attr', 'data-item-name', '사이다');
  });
});
