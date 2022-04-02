describe('상품 삭제 테스트', () => {
  const itemName = '콜라';
  const itemPrice = 1000;
  const itemQuantity = 10;

  beforeEach(() => {
    cy.visit('/#item-manage');
  });

  it('추가한 상품에 삭제 버튼을 누르면 상품을 삭제할 수 있다.', () => {
    cy.addItem(itemName, itemPrice, itemQuantity);

    cy.get('.delete-item-button').click();

    cy.get('tr').should('have.length', 1);
  });
});
