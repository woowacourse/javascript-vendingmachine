import { coinToMoney, krLocaleStringToInt } from '../../src/utils';
import { testid } from '../support/utils';

describe('상품을 구매한다', () => {
  const email = `${Date.now()}@gmail.com`;
  const name = '윤병인';
  const password = 'Abcde123!';
  const product = {
    name: '콜라',
    price: 1000,
    quantity: 10,
  };
  const chargedMoney = 3000;
  const insertedMoney = 3000;

  before(() => {
    cy.register(email, name, password);
    cy.login(email, password);
  });

  it('돈을 투입한다', () => {
    cy.restoreLocalStorage();
    cy.insertMoney(insertedMoney);
    cy.get(testid`inserted-money`)
      .invoke('text')
      .should('eq', insertedMoney.toLocaleString());
  });

  it('상품을 구매한다', () => {
    cy.restoreLocalStorage();
    cy.addProduct(product); // 상품 추가
    cy.chargeMoney(chargedMoney); // 잔돈 충전
    cy.purchaseProduct(product);
    cy.get(testid`purchase-btn`).click();
    cy.get(`${testid`product-price`} span`)
      .invoke('text')
      .then((_price) => {
        const price = krLocaleStringToInt(_price);
        cy.get(testid`inserted-money`)
          .invoke('text')
          .then((_insertedMoney) => {
            const isPurchased = insertedMoney - price === krLocaleStringToInt(_insertedMoney);
            expect(isPurchased).to.be.true;
          });
      });
  });

  it('잔돈을 반환한다', () => {
    cy.restoreLocalStorage();
    cy.releaseCoin();
    cy.get(testid`release-coin-table`).then(($table) => {
      const $trs = $table.find('tbody tr');
      const coins = {};
      $trs.each((_, $tr) => {
        const $tds = $tr.querySelectorAll('td');
        const [$unit, $count] = $tds;
        const unit = krLocaleStringToInt($unit.querySelector('span').textContent);
        const count = krLocaleStringToInt($count.querySelector('span').textContent);
        coins[unit] = count;
      });
      const changes = coinToMoney(coins);
      cy.get(testid`inserted-money`)
        .invoke('text')
        .then((_insertedMoney) => {
          const isChangesCorrect =
            insertedMoney === krLocaleStringToInt(_insertedMoney) + product.price + changes;
          expect(isChangesCorrect).to.be.true;
        });
    });
  });
});
