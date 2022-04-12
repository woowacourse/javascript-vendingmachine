import { SELECTOR } from '../../src/ts/constant/selector';

describe('금액 투입 테스트', () => {
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

    cy.get(SELECTOR.ITEM_PURCHASE_TAB_BUTTON).click();
  });

  it('상품 구매 탭에서 금액을 입력한 후, 투입 버튼을 눌러 금액을 투입하면 투입한 금액이 갱신된다.', () => {
    cy.insertMoney(moneyInput);
    cy.get(SELECTOR.INPUT_AMOUNT).should('have.text', moneyInput);
  });

  it('숫자가 아닌 값을 입력하고 투입 버튼을 누르면, 경고 메세지가 뜬다.', () => {
    const moneyInput = 'ㅁ';
    cy.insertMoney(moneyInput);
    cy.checkSnackbarVisibility();
  });

  const numberOfInvalidInput = 1;
  it('10원 미만의 값을 입력하고 투입 버튼을 누르면, 경고 메세지가 뜬다.', () => {
    const moneyInput = 9;
    cy.insertMoney(moneyInput);
    cy.checkInvalidInput(numberOfInvalidInput);
  });

  it('1만원 이상 투입하려 하면, 경고 메세지가 뜬다.', () => {
    const moneyInput = 10001;
    cy.insertMoney(moneyInput);
    cy.checkInvalidInput(numberOfInvalidInput);
  });

  it('10원으로 나누어떨어지지 않는 값을 입력하고 투입 버튼을 누르면, 경고 메세지가 뜬다.', () => {
    const moneyInput = 9999;
    cy.insertMoney(moneyInput);
    cy.checkInvalidInput(numberOfInvalidInput);
  });
});

describe('구매 테스트', () => {
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

    cy.get(SELECTOR.ITEM_PURCHASE_TAB_BUTTON).click();
  });

  it('투입한 금액 내에서, 구매 가능 상품을 구매 버튼을 눌러 구입할 수 있다. 수량과 투입 금액이 갱신된다.', () => {
    cy.insertMoney(moneyInput);

    cy.purchaseItem();
    cy.get(SELECTOR.INPUT_AMOUNT).should('have.text', moneyInput - itemPrice);
    cy.get(SELECTOR.ITEM_QUANTITY).should('have.text', itemQuantity - 1);
  });
});

describe('잔돈 반환 테스트', () => {
  const email = `${Math.random().toString(36).substring(3, 8)}@naaver.com`;
  const name = '김이박';
  const password = '1234!@#$asdf';
  const confirmPassword = '1234!@#$asdf';

  before(() => {
    cy.register(email, name, password, confirmPassword);
  });

  const cashInput = 10000;
  const moneyInput = 2000;

  beforeEach(() => {
    cy.login(email, password);
  });

  it('잔돈 반환 버튼을 누르면, 반환된 동전이 잔돈 반환 표에 표시된다.', () => {
    cy.get(SELECTOR.COIN_RECHARGE_TAB_BUTTON).click();
    cy.chargeCoin(cashInput);

    cy.get(SELECTOR.ITEM_PURCHASE_TAB_BUTTON).click();
    cy.insertMoney(moneyInput);

    cy.get(SELECTOR.GIVE_CHANGE_BUTTON).click();
    cy.get(SELECTOR.COIN_COUNT).eq(0).should('not.have.text', '0개');
  });

  it('투입한 금액이 0원일 때, 반환 버튼을 누르면 경고 메세지가 뜬다.', () => {
    cy.get(SELECTOR.COIN_RECHARGE_TAB_BUTTON).click();
    cy.chargeCoin(cashInput);

    cy.get(SELECTOR.ITEM_PURCHASE_TAB_BUTTON).click();

    cy.get(SELECTOR.GIVE_CHANGE_BUTTON).click();
    cy.checkSnackbarVisibility();
  });

  it('잔돈을 반환할 수 없는 경우, 반환 버튼을 누르면 경고 메세지가 뜬다.', () => {
    cy.get(SELECTOR.ITEM_PURCHASE_TAB_BUTTON).click();
    cy.insertMoney(moneyInput);

    cy.get(SELECTOR.GIVE_CHANGE_BUTTON).click();
    cy.checkSnackbarVisibility();
  });

  it('잔돈을 일부만 반환한 경우, 경고 메세지가 뜬다.', () => {
    const cashInput = 1000;
    cy.get(SELECTOR.COIN_RECHARGE_TAB_BUTTON).click();
    cy.chargeCoin(cashInput);

    cy.get(SELECTOR.ITEM_PURCHASE_TAB_BUTTON).click();
    cy.insertMoney(moneyInput);

    cy.get(SELECTOR.GIVE_CHANGE_BUTTON).click();
    cy.checkSnackbarVisibility();
  });
});
