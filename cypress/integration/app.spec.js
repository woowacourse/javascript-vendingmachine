describe('비로그인 시 상품구매만 가능하다', () => {
  beforeEach(() => {
    cy.visit('http://localhost:9000/');
  });

  it('구매할 금액을 투입하면 투입한 금액이 누적된다.', () => {
    const money = 10000;
    cy.get('#add-money-amount').type(money);
    cy.get('.add-money-button').click();
    cy.get('#total-purchase-money').should('not.have.value', money);

    const moreMoney = 100;
    cy.get('#add-money-amount').type(money);
    cy.get('.add-money-button').click();
    cy.get('#total-purchase-money').should('not.have.value', money + moreMoney);
  });

  it('금액을 투입하지 않고 반환을 하면 snackbar로 에러를 보여준다', () => {
    cy.get('#return-button').click();
    cy.get('.snackbar').should('be.visible');
  });
});

describe('로그인 및 회원가입을 할 수 있다', () => {
  const email = 'woowa@tech.com';
  const name = 'woowa';
  const password = 'woowa123@';

  before(() => {
    cy.visit('http://localhost:9000/');
  });

  it('로그인 버튼을 누르면 로그인 화면이 보여진다.', () => {
    cy.get('.login-button').click();
    cy.get('#login-form').should('be.visible');
  });

  it('로그인 화면에서 회원가입을 누르면 회원가입 화면이 보여진다.', () => {
    cy.get('.register').click();
    cy.get('#register-form').should('be.visible');
  });

  it('규칙에 맞는 이메일, 이름, 비밀번호로 회원가입을 할 수 있다.', () => {
    cy.get('[name="email"]').type(email);
    cy.get('[name="userName"]').type(name);
    cy.get('[name="password"]').type(password);
    cy.get('[name="passwordCheck"]').type(password);

    // cy.get('.register-button').click().then();
  });
});
