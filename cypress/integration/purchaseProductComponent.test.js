describe('상품 구매 하기 E2E 테스트', () => {
  before(() => {
    cy.setSignIn();
    cy.visit('/');

    cy.get('.nav__product-button').click();
    cy.setProduct();
    cy.get('.product-info-form__add-button').click();

    cy.get('.nav__charge-button').click();
    cy.get('.charge-form-section__charge-money-input').type(5000);
    cy.get('.charge-form-section__button').click();
  });

  it('사용자는 상품 구입을 위해 투입할 금액을 입력하고 투입 버튼을 클릭하면 해당하는 금액이 투입한 금액에 표시된다.', () => {
    cy.get('.nav__purchase-button').click();
    cy.get('.purchase-form-section__consumer-charge-money-input').type(5000);
    cy.get('.consumer-charge-money-form-section__button').click();
    cy.get(
      '.consumer-charge-money-form-section__total-consumer-charge-money'
    ).should('have.text', '5000');
  });

  it('사용자가 구매하고 싶은 상품의 구매 버튼을 클릭하면, 해당하는 상품의 가격만큼 투입한 금액이 차감되고, 해당하는 상품의 수량은 -1 된 수량이 표시된다.', () => {
    cy.get('.product-table__purchase-button').click();
    cy.get('.product-table__purchase-product-quantity').should(
      'have.text',
      '11'
    );
  });

  it('사용자가 상품을 구매후 잔돈 반환하기 버튼을 클릭하면, 투입한 금액이 초기화 된다.', () => {
    cy.get('.return-coin-quantity-section__return-button').click();

    cy.get('.return-coin').then((elements) => {
      const [coinQuantity500, coinQuantity100, coinQuantity50, coinQuantity10] =
        Array.from(elements, (element) => element.textContent);

      const sumCoins =
        Number(coinQuantity500) * 500 +
        Number(coinQuantity100) * 100 +
        Number(coinQuantity50) * 50 +
        Number(coinQuantity10) * 10;

      expect(sumCoins).to.equal(3800);
    });

    cy.get(
      '.consumer-charge-money-form-section__total-consumer-charge-money'
    ).should('have.text', 0);
  });
});
