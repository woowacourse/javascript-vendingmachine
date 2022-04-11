import { CONFIGURATION, ERROR_MESSAGE } from './../../src/constants';

describe('관리자 인증 UI 테스트', () => {
  before(() => {
    cy.visit('http://localhost:9000/javascript-vendingmachine/');
  });

  it('비 로그인 상태에서는 로그인 버튼이 보인다', () => {
    cy.get('.login-button').should('be.visible');
  });

  it('로그인 버튼을 누르면 로그인 화면으로 진입한다.', () => {
    cy.get('.login-button').click();

    cy.get('#signin-form__email').should('be.visible');
    cy.get('#signin-form__password').should('be.visible');
  });

  it('로그인 화면에서 회원가입 텍스트를 누르면 회원가입 화면으로 진입한다.', () => {
    cy.get('.signup-text').click();

    cy.location().should((loc) => {
      expect(loc.href).to.eq('http://localhost:9000/javascript-vendingmachine/signup');
    });
  });

  it('[예외] 회원가입 화면에서 비밀번호, 비밀번호 확인값이 일치하지 않으면 스낵바로 메시지를 표시한다.', () => {
    cy.typeSignupForm('test@gmail', '민초', '1234567a', '1234567b');
    cy.get('#signup-form__button').click();

    cy.get('#snack-bar').should('have.text', ERROR_MESSAGE.PASSWORD_CONFIRM);
  });

  it('[예외] 회원가입 화면에서 비밀번호의 조건이 맞지 않으면 스낵바로 메시지를 표시한다.', () => {
    cy.signupFormClear();
    cy.typeSignupForm('test@gmail', '민초', '12345678', '12345678');
    cy.get('#signup-form__button').click();

    cy.get('#snack-bar').should('have.text', ERROR_MESSAGE.NOT_MATCH_PASSWORD_REGEXP);
  });

  it('회원가입 화면에서 입력 값의 조건이 맞으면 회원가입에 성공하고 로그인 페이지로 이동한다.', () => {
    cy.intercept('POST', 'https://js-vendingmachine-server.herokuapp.com/signup').as('signupRequest');

    cy.signupFormClear();
    cy.typeSignupForm(`${Math.random().toString(36).substring(8)}@gmail.com`, '민초', '1234567a', '1234567a');
    cy.get('#signup-form__button').click();

    cy.wait('@signupRequest');

    cy.location().should((loc) => {
      expect(loc.href).to.eq('http://localhost:9000/javascript-vendingmachine/signin');
    });
  });

  it('[예외] 로그인 화면에서 입력한 값이 서버에 존재하지 않는 경우 스낵바로 메시지로 표시한다.', () => {
    cy.typeSigninForm('notexist@notexist.com', '1234567a');
    cy.get('#signin-form__button').click();

    cy.get('#snack-bar').should('have.text', ERROR_MESSAGE.NOT_MATCH_USER_INFO);
  });

  it('로그인에 성공하면 자판기 관리화면으로 이동한다.', () => {
    cy.intercept('POST', 'https://js-vendingmachine-server.herokuapp.com/signin').as('signinRequest');

    cy.signinFormClear();
    cy.typeSigninForm('mincho@woowa.com', '1234567a');
    cy.get('#signin-form__button').click();

    cy.wait('@signinRequest');

    cy.location().should((loc) => {
      expect(loc.href).to.eq('http://localhost:9000/javascript-vendingmachine/');
    });
  });

  it('로그인에 성공하면 사용자 이름의 첫 글자를 포함한 썸네일이 보인다.', () => {
    cy.get('.user-info-button').should('be.visible');
    cy.get('.user-info-button').should('have.text', '민');
  });

  it('썸네일을 클릭하면 회원정보 수정, 로그아웃 버튼이 보인다.', () => {
    cy.get('.user-info-button').click();

    cy.get('.select-box__edit-profile-button').should('be.visible');
    cy.get('.select-box__logout-button').should('be.visible');
  });
});

describe('사용자 UI 테스트', () => {
  before(() => {
    cy.visit('http://localhost:9000/javascript-vendingmachine/');
  });

  it('정상 금액을 투입하면 투입한 금액이 화면에 반영된다.', () => {
    cy.inputMoney(CONFIGURATION.INPUT.MAX);

    cy.get('.purchase-form__money-input-amount').should('have.text', '10,000');
  });

  it('[예외] 투입 금액 한도를 초과하면 메시지를 표시한다.', () => {
    cy.get('.purchase-form__money-input').clear();
    cy.inputMoney(CONFIGURATION.INPUT.MAX + 1);

    cy.get('.purchase-form').then(($purchaseForm) => expect($purchaseForm[0].checkValidity()).to.be.false);
  });

  it('[예외] 자판기에 보유한 잔돈이 없을 경우 잔돈 반환 시 스낵바로 메시지를 표시한다.', () => {
    cy.get('.purchase-return-button').click();

    cy.get('#snack-bar').should('have.text', ERROR_MESSAGE.EMPTY_CHANGE);
  });
});
