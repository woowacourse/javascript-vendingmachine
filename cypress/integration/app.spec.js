describe('로그인 사용자는', () => {
  beforeEach(() => {
    cy.visit('http://localhost:9000');
    cy.wait(50);
    cy.get('#login-link').click();
    cy.login({ email: 'test@test.com', password: 'asdf1234' });
  });

  it('유저 썸네일 버튼과 네비게이션 바가 보여야 한다.', () => {
    cy.get('#user-thumbnail').should('exist');
    cy.get('nav-bar').should('exist');
  });

  it('상품을 추가할 수 있어야 한다.', () => {
    cy.get('#item-management-link').click();
    cy.addItem({ name: '콜라', price: '1000', quantity: '15' });
    cy.get('.item-row').then((items) => {
      cy.wrap(items[0]).find('.item-name').should('have.text', '콜라');
      cy.wrap(items[0]).find('.item-price').should('have.text', '1000');
      cy.wrap(items[0]).find('.item-quantity').should('have.text', '15');
    });
  });

  it('잔돈을 충전할 수 있어야 한다.', () => {
    cy.get('#change-charge-link').click();
    cy.chargeChange(10000);
    cy.get('current-money span').should('have.text', '10000원');
  });
});

describe('비로그인 사용자는', () => {
  beforeEach(() => {
    cy.visit('http://localhost:9000');
    cy.wait(50);
  });

  it('로그인 버튼이 보여야 하고 네비게이션 바가 보이지 않아야 한다.', () => {
    cy.get('#login-link').should('exist');
    cy.get('nav-bar').should('not.exist');
  });

  it('회원가입할 수 있어야 한다.', () => {
    cy.get('#login-link').click();
    cy.get('#signup-link').click();
    cy.signup({
      email: `${Date.now()}@test.com`,
      name: '테스트',
      password: 'asdf1234',
      passwordConfirm: 'asdf1234',
    });
    cy.get('#user-thumbnail').should('have.text', '테');
  });

  it('상품을 구매할 수 있어야 한다.', () => {
    cy.get('#login-link').click();
    cy.login({ email: 'test@test.com', password: 'asdf1234' });
    cy.get('#item-management-link').click();
    cy.addItem({ name: '콜라', price: '1000', quantity: '15' });
    cy.get('#change-charge-link').click();
    cy.chargeChange(10000);
    cy.logout();

    cy.get('#insert-amount').type('10000');
    cy.get('#insert-money-button').click();
    cy.get('inserted-money span').should('have.text', '10000원');

    cy.get('.purchasable-item-row .item-purchase-button').click();
    cy.get('.purchasable-item-row .item-quantity').should('have.text', 14);
  });
});
