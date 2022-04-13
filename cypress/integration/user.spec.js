import { SELECTOR } from '../../src/js/constants/viewConstants';

describe('일반 사용자의 경우', () => {
  before(() => {
    cy.interceptAllRequest();
    cy.visit('http://localhost:9000');
  });

  it('상품을 구매할 금액을 투입하고 물건을 구매할 수 있다.', () => {
    const inputMoney = 5000;

    cy.get(SELECTOR.CLASS.CHARGE_MONEY_INPUT).type(`${inputMoney}{enter}`);
    cy.get(SELECTOR.ID.CURRENT_INPUT_MONEY).contains(inputMoney);

    cy.get(`.${SELECTOR.CLASS_STRING.ITEM_TABLE_PURCHASE_BUTTON}`).eq(0).click();
    cy.get(`.${SELECTOR.CLASS_STRING.TABLE_ITEM_PRICE}`)
      .eq(0)
      .invoke('text')
      .then(price => {
        const restMoney = inputMoney - Number(price);
        cy.get(SELECTOR.ID.CURRENT_INPUT_MONEY).contains(restMoney);
      });
  });

  it('남은 투입한 금액을 반환할 수 있다.', () => {
    const inputMoney = 5000;

    cy.get(SELECTOR.CLASS.CHARGE_MONEY_INPUT).type(`${inputMoney}{enter}`);
    cy.get(SELECTOR.CLASS.RETURN_CHANGE_BUTTON).click();
    cy.get(SELECTOR.ID.CURRENT_INPUT_MONEY).contains(0);
  });
});
