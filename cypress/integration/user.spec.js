describe('사용자 테스트', () => {
  beforeEach(() => {
    cy.visit('dist/index.html');

    const email = 'test1@test1';
    const password = 'Password1234';
    cy.get('#login-button').click();
    cy.login(email, password);
  });

  it('관리자가 추가한 상품들을 사용자가 구매할 수 있어야 한다.', () => {
    // 상품 추가
    const product = {
      name: '상품1',
      price: 1000,
      quantity: 2,
    };
    cy.get('#manage-menu').click();
    cy.get('#product-name-input').type(product.name);
    cy.get('#product-price-input').type(product.price);
    cy.get('#product-quantity-input').type(product.quantity);
    cy.get('#product-add-form button').click();

    cy.logout();

    // 상품이 추가되었는 지 확인
    cy.get('#purchase-tbody').find('tr').should('have.length', 1);

    cy.chargeUserAmount(2000);

    // 구매
    cy.get('#purchase-tbody tr button').click();
    cy.get('#purchase-tbody tr td').eq(2).contains('1');
    cy.get('#purchase-tbody tr button').click();
    cy.get('#purchase-tbody tr').should('not.exist');
  });

  it('관리자가 추가한 잔돈의 범위 내에서 투입한 금액을 반환 받을 수 있다.', () => {
    // 잔돈 추가
    cy.get('#charge-menu').click();
    cy.get('#charge-amount-input').type(1000);
    cy.get('#charge-form button').click();

    cy.logout();

    cy.chargeUserAmount(2000);

    cy.get('#return-button').click();
    cy.get('#current-amount').contains('투입한 금액: 1000원');
    cy.get('#return-button').click();
    cy.get('#current-amount').contains('투입한 금액: 1000원');
  });
});
