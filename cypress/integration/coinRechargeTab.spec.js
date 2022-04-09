import { SELECTOR, SELECTOR_NAME } from '../../src/ts/constant/selector';

describe('잔돈 충전 탭 테스트', () => {
  const email = `${Math.random().toString(36).substring(3, 8)}@naaver.com`;
  const name = '김이박';
  const password = '1234!@#$asdf';
  const confirmPassword = '1234!@#$asdf';

  before(() => {
    cy.register(email, name, password, confirmPassword);
  });

  beforeEach(() => {
    cy.login(email, password);
    cy.get(SELECTOR.COIN_RECHARGE_TAB_BUTTON).click();
  });

  it('올바른 금액을 입력하고 충전 버튼을 누르면 총 잔돈이 갱신된다.', () => {
    const cashInput = 1000;
    cy.chargeCoin(cashInput);
    cy.get(SELECTOR.CHARGED_AMOUNT).should('have.text', cashInput);
  });

  it('금액을 누적해서 충전하면 누적값만큼 총 잔돈이 갱신된다.', () => {
    const prevCashInput = 1000;
    const nextCashInput = 5000;
    cy.chargeCoin(prevCashInput);
    cy.chargeCoin(nextCashInput);
    cy.get(SELECTOR.CHARGED_AMOUNT).should('have.text', prevCashInput + nextCashInput);
  });

  const numberOfInvalidInput = 1;

  it('숫자가 아닌 값을 입력하고 충전 버튼을 누르면, 경고 메세지가 뜬다.', () => {
    const cashInput = 'ㅁ';
    cy.chargeCoin(cashInput);
    cy.checkSnackbarVisibility();
  });

  it('최소 금액(10원) 미만의 값을 입력하고 충전 버튼을 누르면, 경고 메세지가 뜬다.', () => {
    const cashInput = 9;
    cy.chargeCoin(cashInput);
    cy.checkInvalidInput(numberOfInvalidInput);
  });

  it('최대금액(10만원)을 초과해서 충전하려 하면, 경고 메세지가 뜬다.', () => {
    const cashInput = 100001;
    cy.chargeCoin(cashInput);
    cy.checkInvalidInput(numberOfInvalidInput);
  });

  it('최소 단위(10원)로 나누어떨어지지 않는 값을 입력하고 충전 버튼을 누르면, 경고 메세지가 뜬다.', () => {
    const cashInput = 9999;
    cy.chargeCoin(cashInput);
    cy.checkInvalidInput(numberOfInvalidInput);
  });
});
