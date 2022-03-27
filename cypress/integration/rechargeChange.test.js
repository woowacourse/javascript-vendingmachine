import { ERROR_MSG } from '../../src/utils/constants';

describe('잔돈을 충전할 수 있다.', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('#recharge-change-tab').click();
  });

  it('금액을 입력하면 동전들이 자판기에 생성된다.', () => {
    const changeInput = 1000;
    cy.rechargeChange(changeInput);
    cy.get('#recharge-coin-table span').then($els => {
      const [coin500, coin100, coin50, coin10] = [...$els].map(el => el.textContent);

      const expectedChangeInput =
        Number(coin500) * 500 + Number(coin100) * 100 + Number(coin50) * 50 + Number(coin10) * 10;

      expect(expectedChangeInput).to.equal(changeInput);
    });
  });

  it('범위를 벗어나는 값을 입력하면 alert창을 띄워준다', () => {
    const changeInput = -100;
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);
    cy.rechargeChange(changeInput).then(() => {
      expect(alertStub).to.be.calledWith(ERROR_MSG.CHANGE_OUT_OF_RANGE);
    });
  });
});
