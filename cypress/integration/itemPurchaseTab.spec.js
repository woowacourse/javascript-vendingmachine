describe('상품 구매 탭 테스트', () => {
  const email = 'a@naaver.com';
  const password = '1234!@#$asdf';

  const itemName = '콜라';
  const itemPrice = 1000;
  const itemQuantity = 10;

  const cashInput = 10000;
  const moneyInput = 2000;

  beforeEach(() => {
    cy.login(email, password);

    cy.get('#item-manage-tab-button').click();
    cy.addItem(itemName, itemPrice, itemQuantity);

    cy.get('#coin-recharge-tab-button').click();
    cy.chargeCoin(cashInput);
  });

  it('상품 구매 탭에서 금액을 입력한 후, 투입 버튼을 눌러 금액을 투입하면 투입한 금액이 갱신된다.', () => {
    cy.get('#item-purchase-tab-button').click();
    cy.insertMoney(moneyInput);
    cy.get('#input-amount').should('have.text', moneyInput);
  });

  it('투입한 금액 내에서, 구매 가능 상품을 구매 버튼을 눌러 구입할 수 있다. 수량과 투입 금액이 갱신된다.', () => {
    cy.get('#item-purchase-tab-button').click();
    cy.insertMoney(moneyInput);

    cy.purchaseItem();
    cy.get('#input-amount').should('have.text', moneyInput - itemPrice);
    cy.get('.item-quantity').should('have.text', itemQuantity - 1);
  });

  it('잔돈 반환 버튼을 누르면, 반환된 동전이 잔돈 반환 표에 표시된다.', () => {
    cy.get('#item-purchase-tab-button').click();
    cy.insertMoney(moneyInput);

    cy.get('.give-change-button').click();
    cy.get('.coin-count').eq(0).should('not.have.text', '0개');
  });
});
