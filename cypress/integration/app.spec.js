import { ALERT_MESSAGE } from '../../src/js/constants';
const userEmail = `${Date.now()}@test.com`;
const userName = 'test';
const userPassword = '1q2w3e!!';

describe('기본 시나리오 동작 확인', () => {
  before(() => {
    cy.visit('http://localhost:9000/');
  });

  describe('로그인 / 회원가입 테스트', () => {
    it('로그인 버튼을 누르면 로그인 화면으로 이동해야한다.', () => {
      cy.get('#login-page-button')
        .click()
        .then(() => {
          cy.url().should('contain', '#!/login');
        });
    });

    it('회원가입 버튼을 누르면 회원가입 화면으로 이동해야한다.', () => {
      cy.get('#register-link')
        .click()
        .then(() => {
          cy.url().should('contain', '#!/register');
        });
    });

    it('입력창에 유효한 값을 입력하여 회원가입을 할 수 있어야한다.', () => {
      cy.get('#email-input').type(userEmail);
      cy.get('#name-input').type(userName);
      cy.get('#password-input').type(userPassword);
      cy.get('#password-check-input').type(userPassword);

      cy.get('#register-button')
        .click()
        .then(() => {
          cy.get('.snackbar').should('contain', ALERT_MESSAGE.REGISTER_SUCCESS);
        });
    });

    it('회원가입한 계정을 입력하여 로그인을 할 수 있어야한다.', () => {
      cy.get('#email-input').type(userEmail);
      cy.get('#password-input').type(userPassword);

      cy.get('#login-button')
        .click()
        .then(() => {
          cy.get('.snackbar').should('contain', ALERT_MESSAGE.LOGIN_SUCCESS(userName));
        });
    });
  });

  describe('관리자 기능 테스트', () => {
    const productName = '사이다';
    const productPrice = '1000';
    const productAmount = '10';
    const productModifyAmount = '20';
    const addChangeMoney = 10000;

    it('관리자는 자판기에 상품을 추가할 수 있어야 한다.', () => {
      cy.get('#product-name-input').type(productName);
      cy.get('#product-price-input').type(productPrice);
      cy.get('#product-amount-input').type(productAmount);

      cy.get('#product-add-button')
        .click()
        .then(() => {
          cy.get('.snackbar').should('contain', ALERT_MESSAGE.ADD_PRODUCT_SUCCESS(productName));
        });
    });

    it('관리자는 자판기의 상품을 수정할 수 있어야 한다.', () => {
      cy.get('.product-modify-button').click();
      cy.get('.product-amount-modify-input').clear().type(productModifyAmount);
      cy.get('.product-modify-submit-button')
        .click()
        .then(() => {
          cy.get('.snackbar').should('contain', ALERT_MESSAGE.MODIFY_PRODUCT_SUCCESS(productName));
        });
    });

    it('관리자는 자판기의 상품을 삭제할 수 있어야 한다.', () => {
      cy.get('.product-remove-button')
        .click()
        .then(() => {
          cy.on('window:confirm', text => {
            expect(text).to.contains(REMOVE_CONFIRM_MESSAGE);
            return true;
          });
          cy.get('.snackbar').should('contain', ALERT_MESSAGE.DELETE_PRODUCT_SUCCESS(productName));
        });
    });

    it('관리자는 자판기의 잔돈을 채울 수 있어야 한다.', () => {
      cy.get('nav > #change-add-button').click();
      cy.get('#change-add-input').type(addChangeMoney);
      cy.get('#change-add-form > #change-add-button')
        .click()
        .then(() => {
          cy.get('.snackbar').should('contain', ALERT_MESSAGE.ADD_CHARGE_SUCCESS(addChangeMoney));
        });
    });

    it('관리자는 로그아웃 버튼을 눌러 로그아웃 할 수 있어야 한다.', () => {
      cy.login(userEmail, userPassword);

      cy.get('.user-menu-symbol').click();
      cy.get('#logout')
        .click()
        .then(() => {
          cy.get('.snackbar').should('contain', ALERT_MESSAGE.LOGOUT_SUCCESS);
        });
    });
  });
});
