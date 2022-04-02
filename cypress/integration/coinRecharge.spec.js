import { CASH_ERROR_MESSAGE } from '../../src/ts/constant/errorMessage';

describe('잔돈 충전 테스트', () => {
  const initialChargedAmount = 0;
  const expectedInvalidInputCount = 1;

  beforeEach(() => {
    cy.visit('/#coin-recharge');
  });

  it('유효한 금액을 입력하고 충전 버튼을 누르면 잔돈이 충전된다.', () => {
    const cashInput = 1000;

    cy.rechargeCoin(cashInput);

    cy.checkChargedAmount(cashInput);
  });

  it('충전 금액이 10원보다 작으면 금액이 충전되지 않는다.', () => {
    const cashInput = 9;

    cy.rechargeCoin(cashInput);

    cy.checkInvalidInputCount(expectedInvalidInputCount);
    cy.checkChargedAmount(initialChargedAmount);
  });

  it('충전 금액이 100,000원보다 크면 금액이 충전되지 않는다.', () => {
    const cashInput = 100001;

    cy.rechargeCoin(cashInput);

    cy.checkInvalidInputCount(expectedInvalidInputCount);
    cy.checkChargedAmount(initialChargedAmount);
  });

  it('충전 금액이 10원으로 나누어 떨어지지 않으면 충전되지 않는다.', () => {
    const cashInput = 11;

    cy.rechargeCoin(cashInput);

    cy.checkInvalidInputCount(expectedInvalidInputCount);
    cy.checkChargedAmount(initialChargedAmount);
  });

  it('충전 금액이 숫자 타입이 아니면 경고창이 보이고 금액이 충전되지 않는다.', () => {
    const cashInput = 'ㄱ';

    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    cy.rechargeCoin(cashInput).then(() => {
      expect(alertStub).to.be.calledWith(CASH_ERROR_MESSAGE.NOT_NUMBER_TYPE);
    });
    cy.checkChargedAmount(initialChargedAmount);
  });

  it('이미 충전된 금액과 현재 충전하려는 금액의 합이 100,000원이 넘으면 경고창이 보이고 금액이 충전되지 않는다.', () => {
    const firstCashInput = 40000;
    const secondCashInput = 60010;

    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    cy.rechargeCoin(firstCashInput);
    cy.rechargeCoin(secondCashInput).then(() => {
      expect(alertStub).to.be.calledWith(CASH_ERROR_MESSAGE.EXCEED_TOTAL_AMOUNT_RANGE);
    });
    cy.checkChargedAmount(firstCashInput);
  });
});
