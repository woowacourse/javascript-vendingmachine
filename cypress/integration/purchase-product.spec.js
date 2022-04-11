describe('상품 구매 페이지를 테스트한다.', () => {
  beforeEach(() => {
    cy.visit('http://localhost:9000');
    cy.login();
  });
  const money = 5000;

  it('금액을 입력하고 투입 버튼을 누르면 금액이 투입된다.', () => {
    cy.insertMoney(money);
    cy.get('purchase-product-form label').eq(1).contains(money.toLocaleString());
  });

  it('제품을 구매할 수 있습니다.', () => {
    const name = '콜라';
    const price = '1200';
    const quantity = '10';
    cy.addProduct(name, price, quantity);

    cy.get('[data-destination=purchase-product-tab]').click();
    cy.insertMoney(money);
    cy.get('purchase-product-inventory button').click();

    cy.get('purchase-product-inventory td')
      .eq(2)
      .contains(Number(quantity) - 1);
  });
});
