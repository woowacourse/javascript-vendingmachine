import { ERROR_MESSAGE, SNACK_BAR_MESSAGE } from '../../src/js/constants/constants';

describe('사용자 입장 자판기 사용 테스트', () => {
  const email = 'onstar@woowa.com';
  const password = 'onstar123!';

  beforeEach(() => {
    cy.visit('dist/index.html');

    // 관리자 로그인
    cy.get('#login-email-input').type(email);
    cy.get('#login-password-input').type(password);
    cy.get('#login-form > button').click();

    // 상품 추가
    cy.get('#item-manage-tab').click();
    cy.get('#add-item-name').type('콜라');
    cy.get('#add-item-price').type(1000);
    cy.get('#add-item-quantity').type(10);
    cy.get('.submit-button').click();

    // 잔돈 충전
    cy.get('#money-charge-tab').click();
    cy.get('.charge-money-input').type(10000);
    cy.get('.submit-button').click();

    // 관리자 로그아웃
    cy.get('#user-badge').click({ force: true });
    cy.get('#logout').click();
  });

  it('구매할 금액을 투입할 수 있다.', () => {
    cy.get('.purchase-item-input').type(5000);
    cy.get('.submit-button')
      .click()
      .then(() => {
        cy.get('#purchase-money-input').should('have.text', 5000);
      });
  });

  it('0원 이하의 금액은 투입할 수 없다.', () => {
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    cy.get('.purchase-item-input').type(0);
    cy.get('.submit-button')
      .click()
      .then(() => {
        expect(alertStub).to.be.calledWith(ERROR_MESSAGE.INPUT_MONEY_UNDER_MIN);
      });
  });

  it('10000원 보다 많은 금액을 투입할 수 없다.', () => {
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    cy.get('.purchase-item-input').type(10001);
    cy.get('.submit-button')
      .click()
      .then(() => {
        expect(alertStub).to.be.calledWith(ERROR_MESSAGE.INPUT_PURCHASE_MONEY_OVER_MAX);
      });
  });

  it('10원 단위의 금액만 투입할 수 있다.', () => {
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    cy.get('.purchase-item-input').type(1001);
    cy.get('.submit-button')
      .click()
      .then(() => {
        expect(alertStub).to.be.calledWith(ERROR_MESSAGE.INPUT_MONEY_INVALID_UNIT);
      });
  });

  it('정수가 아닌 숫자는 금액으로 입력할 수 없다.', () => {
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    cy.get('.purchase-item-input').type('e');
    cy.get('.submit-button')
      .click()
      .then(() => {
        expect(alertStub).to.be.calledWith(ERROR_MESSAGE.INPUT_MONEY_NOT_INTEGER);
      });
  });

  it('금액을 투입 후 상품을 구매할 수 있다.', () => {
    cy.get('.purchase-item-input').type(5000);
    cy.get('.submit-button').click();
    cy.get('.item-table-purchase-button')
      .click()
      .then(() => {
        cy.get('tbody > :nth-child(2) > :nth-child(3)').should('have.text', 9);
      });
  });

  it('금액을 투입 후 상품을 구매할 수 있다.', () => {
    cy.get('.purchase-item-input').type(5000);
    cy.get('.submit-button').click();
    cy.get('.item-table-purchase-button')
      .click()
      .then(() => {
        cy.get('tbody > :nth-child(2) > :nth-child(3)').should('have.text', 9);
      });
  });

  it('상품의 금액보다 투입 금액이 적을 시 상품을 구매할 수 없다.', () => {
    cy.get('.purchase-item-input').type(500);
    cy.get('.submit-button').click();
    cy.get('.item-table-purchase-button')
      .click()
      .then(() => {
        cy.get('tbody > :nth-child(2) > :nth-child(3)').should('have.text', 10);
      });
  });

  it('잔돈을 반환 받을 수 있다.', () => {
    cy.get('.purchase-item-input').type(5000);
    cy.get('.submit-button').click();
    cy.get('.return-money-button').click();
    cy.get('#snackbar').should('have.text', SNACK_BAR_MESSAGE.CHANGE_RETURNED);
  });

  it('투입된 금액이 없는 경우, 잔돈을 반환 받을 수 없다.', () => {
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    cy.get('.return-money-button')
      .click()
      .then(() => {
        expect(alertStub).to.be.calledWith(ERROR_MESSAGE.NO_INPUT_MONEY);
      });
  });

  it('자판기에 잔돈이 없는 경우, 잔돈을 반환 받을 수 없다.', () => {
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    cy.get('.purchase-item-input').type(10000);
    cy.get('.submit-button').click();
    cy.get('.return-money-button').click();

    cy.get('.purchase-item-input').type(5000);
    cy.get('.submit-button').click();
    cy.get('.return-money-button')
      .click()
      .then(() => {
        expect(alertStub).to.be.calledWith(ERROR_MESSAGE.NO_CHANGE_MONEY);
      });
  });
});
