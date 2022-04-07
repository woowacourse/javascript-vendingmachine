describe('로그인 및 회원가입을 할 수 있다', () => {
  const email = 'woowa1234@tech.com';
  const name = 'woowa';
  const password = 'woowa123@';

  before(() => {
    cy.visit('http://localhost:9000/');
  });

  after(() => {
    cy.get('#logout').click({ force: true });
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

    cy.get('.register-button')
      .click()
      .then(() => {
        cy.get('.user-button').should('have.text', 'w');
      });
  });
});

describe('로그인, 회원가입 오류. 오류를 snackbar로 보여준다', () => {
  const email = 'woowa1234@tech.com';
  const name = 'woowa';
  const password = 'woowa123@';

  beforeEach(() => {
    cy.visit('http://localhost:9000/');
  });

  it('이미 존재하는 이메일로 회원가입은 불가능하다.', () => {
    cy.get('.login-button').click();
    cy.get('.register').click();
    cy.get('[name="email"]').type(email);
    cy.get('[name="userName"]').type(name);
    cy.get('[name="password"]').type(password);
    cy.get('[name="passwordCheck"]').type(password);
    cy.get('.register-button')
      .click()
      .then(() => {
        cy.get('.snackbar').should('be.visible');
      });
  });

  it('존재하지 않는 이메일로는 로그인이 불가능하다.', () => {
    cy.login(`${Date.now()}@naver.com`, 'password');
    cy.get('.snackbar').should('be.visible');
  });

  it('올바르지 않은 패스워드로는 로그인이 불가능하다.', () => {
    cy.login(email, 'password');
    cy.get('.snackbar').should('be.visible');
  });
});

describe('로그인 시 상품 관리, 잔돈 충전, 상품 구매를 할 수 있다.', () => {
  const email = 'woowa1234@tech.com';
  const password = 'woowa123@';

  const money = 1500;
  const moreMoney = 600;

  before(() => {
    cy.visit('http://localhost:9000/');
    cy.login(email, password);
  });

  it('상품 추가', () => {
    cy.addItem('빈츠', 2000, 5);
    cy.get('[is="item-row"]').should('be.visible');
  });

  it('상품 추가: 상품을 수정할 수 있다', () => {
    cy.get('.item-edit-button').click();
    cy.get('.item-quantity-edit-input').clear().type(3);
    cy.get('.item-update-button').click();
    cy.get('.item-quantity').should('have.text', '3');
  });

  it('잔돈 추가', () => {
    cy.get('#change-charge').click();
    cy.get('#charge-amount').type('10');
    cy.get('.add-charge-button').click();
    cy.get('tbody>tr').eq(3).should('contain', '1');
  });

  it('상품 구매: 금액을 투입하지 않고 반환을 하면 snackbar로 에러를 보여준다', () => {
    cy.get('#item-purchase').click();
    cy.get('#return-button').click();
    cy.get('.snackbar').should('be.visible');
  });

  it('상품 구매: 구매할 금액을 투입하면 투입한 금액이 누적된다.', () => {
    cy.get('#add-money-amount').type(money);
    cy.get('.add-money-button').click();
    cy.get('#total-purchase-money').should('have.text', money);

    cy.get('#add-money-amount').type(moreMoney);
    cy.get('.add-money-button').click();
    cy.get('#total-purchase-money').should('have.text', money + moreMoney);
  });

  it('상품 구매', () => {
    cy.get('.item-buy-button').click();
    cy.get('#total-purchase-money').should(
      'have.text',
      money + moreMoney - 2000
    );
  });

  it('상품 구매: 구입할 상품이 투입한 금액보다 비싸다면 snackbar로 에러를 보여준다', () => {
    cy.get('.item-buy-button').click();
    cy.get('.snackbar').should('be.visible');
  });

  it('상품 구매: 반환 버튼을 누르면 잔돈이 반환된다', () => {
    cy.get('#return-button').click();
    cy.get('.return-table>tbody>tr').eq(3).should('contain', '1');
  });
});

describe('비로그인 시 상품구매만 가능하다', () => {
  const email = 'woowa1234@tech.com';
  const password = 'woowa123@';
  const money = 10000;

  before(() => {
    cy.visit('http://localhost:9000/');
    cy.login(email, password);
    cy.addItem('빈츠', 2000, 5);
    cy.get('#logout').click({ force: true });
  });

  it('상품 구매', () => {
    cy.get('#add-money-amount').type(money);
    cy.get('.add-money-button').click();
    cy.get('.item-buy-button').click();
    cy.get('#total-purchase-money').should('have.text', money - 2000);
  });
});

describe('로그인 시 회원 정보를 수정할 수 있다.', () => {
  const email = 'woowa1234@tech.com';
  const password = 'woowa123@';

  before(() => {
    cy.visit('http://localhost:9000/');
    cy.login(email, password);
  });

  it('회원 정보 수정 페이지', () => {
    cy.get('#user-edit').click({ force: true });
    cy.get('#user-edit-form').should('be.visible');
  });

  it('회원 정보 수정 페이지에서 회원 정보를 수정할 수 있다', () => {
    cy.get('[name="userName"]').clear().type('change');
    cy.get('[name="password"]').type(password);
    cy.get('[name="passwordCheck"]').type(password);
    cy.get('.edit-button')
      .click()
      .then(() => {
        cy.get('.user-button').should('have.text', 'c');
      });
  });

  it('회원 정보 수정 페이지에서 회원 탈퇴를 할 수 있다.', () => {
    cy.get('#user-edit').click({ force: true });
    cy.get('#withdraw-button')
      .click()
      .then(() => {
        cy.get('.login-button').should('be.visible');
      });
  });
});
