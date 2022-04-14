import { testid } from '../support/utils';
import { COIN } from '../../src/constants';
import { krLocaleStringToInt } from '../../src/utils';

describe('잔돈을 충전한다', () => {
  const email = `${Date.now()}@gmail.com`;
  const name = '윤병인';
  const password = 'Abcde123!';
  const chargedMoney = 3000;

  before(() => {
    cy.register(email, name, password);
    cy.login(email, password);
  });

  it('잔돈을 충전한다', () => {
    cy.restoreLocalStorage();
    cy.chargeMoney(chargedMoney);
    cy.get(testid`charged-money`).should('have.text', chargedMoney.toLocaleString());

    cy.get(testid`changes-inventory`).then(($el) => {
      console.log($el[0]);
      const total = COIN.UNITS.reduce((acc, unit) => {
        const count = krLocaleStringToInt($el.find(testid(`coin-unit-${unit}-quantity`)).text());
        return acc + count * unit;
      }, 0);
      cy.get(testid`charged-money`).should('have.text', total.toLocaleString());
    });
  });
});
