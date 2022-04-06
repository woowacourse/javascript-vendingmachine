import { SELECTOR } from '../../src/ts/constant/selector';

describe('상품 구매 탭 테스트', () => {
  const email = `${Math.random().toString(36).substring(3, 8)}@naaver.com`;
  const name = '김이박';
  const password = '1234!@#$asdf';
  const confirmPassword = '1234!@#$asdf';

  before(() => {
    cy.register(email, name, password, confirmPassword);
  });

  const itemName = '콜라';
  const itemPrice = 1000;
  const itemQuantity = 10;

  const cashInput = 10000;
  const moneyInput = 2000;

  beforeEach(() => {
    cy.login(email, password);

    cy.get(SELECTOR.ITEM_MANAGE_TAB_BUTTON).click();
    cy.addItem(itemName, itemPrice, itemQuantity);

    cy.get(SELECTOR.COIN_RECHARGE_TAB_BUTTON).click();
    cy.chargeCoin(cashInput);
  });

  it('상품 구매 탭에서 금액을 입력한 후, 투입 버튼을 눌러 금액을 투입하면 투입한 금액이 갱신된다.', () => {
    cy.get(SELECTOR.ITEM_PURCHASE_TAB_BUTTON).click();
    cy.insertMoney(moneyInput);
    cy.get(SELECTOR.INPUT_AMOUNT).should('have.text', moneyInput);
  });

  it('투입한 금액 내에서, 구매 가능 상품을 구매 버튼을 눌러 구입할 수 있다. 수량과 투입 금액이 갱신된다.', () => {
    cy.get(SELECTOR.ITEM_PURCHASE_TAB_BUTTON).click();
    cy.insertMoney(moneyInput);

    cy.purchaseItem();
    cy.get(SELECTOR.INPUT_AMOUNT).should('have.text', moneyInput - itemPrice);
    cy.get(SELECTOR.ITEM_QUANTITY).should('have.text', itemQuantity - 1);
  });

  it('잔돈 반환 버튼을 누르면, 반환된 동전이 잔돈 반환 표에 표시된다.', () => {
    cy.get(SELECTOR.ITEM_PURCHASE_TAB_BUTTON).click();
    cy.insertMoney(moneyInput);

    cy.get(SELECTOR.GIVE_CHANGE_BUTTON).click();
    cy.get(SELECTOR.COIN_COUNT).eq(0).should('not.have.text', '0개');
  });
});
